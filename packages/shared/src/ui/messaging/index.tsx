import { useEffect, useRef, useState } from "react";
import moment from "moment";

import * as MessagingApi from "../../api/messaging";
import type { Conversation, ConversationMessage } from "../../types/messaging";
import {
  connectMessagingSocket,
  onMessagingReconnect,
  onNewMessage,
  subscribeToConversation,
  unsubscribeFromConversation,
} from "../../socket/messaging";
import { apiCatchGlobalHandler } from "../../utils/function";

import Chat from "./Chat";
import Sidebar from "./Sidebar";

// ---------------------------------------------------------------------------
// Derive userId from the local access token (no verification needed client-side)
// ---------------------------------------------------------------------------
const parseJwt = (token: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const getLocalUserId = (): string => {
  const token = localStorage.getItem("accessToken");
  if (!token || ["null", "undefined", ""].includes(token)) return "";
  return (parseJwt(token)?.userId as string) ?? "";
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string;
};

export type ConversationSummary = {
  id: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
};

export type ActiveConversation = {
  id: string;
  name: string;
  avatar?: string;
  messages: Message[];
};

// Convert API message to UI message shape
const toUiMessage = (m: ConversationMessage): Message => ({
  id: m.id,
  senderId: m.senderId,
  text: m.isDeleted ? "🚫 This message was deleted" : (m.text ?? ""),
  time: moment(m.createdAt).format("HH:mm"),
});

// Derive a display name for a conversation
const convName = (conv: Conversation, myId: string): string => {
  if (conv.isGroup) return conv.title ?? "Group Chat";
  // For direct chats the backend doesn't embed participant names in the
  // conversation record — use a generic label; callers can override via title
  return (
    conv.title ??
    (conv.directPairKey
      ? conv.directPairKey.replace(myId, "").replace("#", "").trim().slice(0, 8) + "…"
      : "Direct Chat")
  );
};

const MessagingView = ({ singleChat }: { singleChat?: boolean }) => {
  const userId = useRef(getLocalUserId()).current;
  const accessToken = localStorage.getItem("accessToken") ?? "";

  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("");
  const [composer, setComposer] = useState("");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | undefined>(
    undefined
  );

  // ── Load conversation list ────────────────────────────────────────────────
  const loadConversations = () => {
    if (!userId) return;
    MessagingApi.getConversations(userId)
      .then((res) => {
        const items: Conversation[] = res.payload?.items ?? [];
        setConversations(
          items.map((c) => ({
            id: c.id,
            name: convName(c, userId),
            lastMessage: "",
            lastTime: c.lastMessageAt ? moment(c.lastMessageAt).fromNow() : "",
          }))
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useEffect(() => {
    loadConversations();
  }, [userId]);

  // ── Load messages when activeId changes ───────────────────────────────────
  useEffect(() => {
    if (!activeId) return;

    MessagingApi.getMessages(activeId)
      .then((res) => {
        const items: ConversationMessage[] = res.payload?.items ?? [];
        const sorted = [...items].reverse(); // API returns DESC; show ASC in chat
        const conv = conversations.find((c) => c.id === activeId);
        setActiveConversation({
          id: activeId,
          name: conv?.name ?? "Chat",
          messages: sorted.map(toUiMessage),
        });
      })
      .catch(apiCatchGlobalHandler);
  }, [activeId]);

  // ── Socket.IO: real-time messages ─────────────────────────────────────────
  useEffect(() => {
    if (!accessToken || ["null", "undefined", ""].includes(accessToken)) return;

    connectMessagingSocket(accessToken);

    const offMsg = onNewMessage((msg) => {
      if (msg.userMessagingId !== activeId) return;
      setActiveConversation((prev) => {
        if (!prev) return prev;
        // Deduplicate (optimistic update may already have it)
        if (prev.messages.some((m) => m.id === msg.id)) return prev;
        return { ...prev, messages: [...prev.messages, toUiMessage(msg)] };
      });
    });

    const offReconnect = onMessagingReconnect(() => {
      loadConversations();
      if (activeId) subscribeToConversation(activeId);
    });

    return () => {
      offMsg();
      offReconnect();
    };
  }, [accessToken, activeId]);

  // ── Subscribe / unsubscribe from conversation room ────────────────────────
  useEffect(() => {
    if (!activeId) return;
    subscribeToConversation(activeId);
    return () => unsubscribeFromConversation(activeId);
  }, [activeId]);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = () => {
    if (!activeConversation || !composer.trim() || !userId) return;

    const text = composer.trim();
    setComposer("");

    MessagingApi.sendMessage(activeId, { senderId: userId, text })
      .then((res) => {
        // Optimistically append if gateway hasn't pushed it yet
        setActiveConversation((prev) => {
          if (!prev) return prev;
          const msg = toUiMessage(res.payload);
          if (prev.messages.some((m) => m.id === msg.id)) return prev;
          return { ...prev, messages: [...prev.messages, msg] };
        });
      })
      .catch(apiCatchGlobalHandler);
  };

  return singleChat ? (
    <Chat
      active={activeConversation}
      composer={composer}
      setComposer={setComposer}
      sendMessage={sendMessage}
      singleChat={singleChat}
      myId={userId}
    />
  ) : (
    <div className="row g-3">
      <div className="col-lg-4 col-xl-3">
        <Sidebar
          query={query}
          setQuery={setQuery}
          conversations={conversations}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>

      <div className="col-lg-8 col-xl-9">
        <Chat
          active={activeConversation}
          composer={composer}
          setComposer={setComposer}
          sendMessage={sendMessage}
          singleChat={singleChat}
          myId={userId}
        />
      </div>
    </div>
  );
};

export default MessagingView;
