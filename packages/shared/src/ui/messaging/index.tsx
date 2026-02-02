import { useLayoutEffect, useState } from "react";

import * as MessagingApi from "../../api/messaging";

import Chat from "./Chat";
import Sidebar from "./Sidebar";

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

const MessagingView = ({ singleChat }: { singleChat?: boolean }) => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("");
  const [composer, setComposer] = useState("");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    MessagingApi.getConversations<ConversationSummary[]>({}).then((res) => {
      setConversations(res.payload);
    });
  }, []);

  useLayoutEffect(() => {
    if (!activeId) return;
    MessagingApi.getMessages<ActiveConversation>(activeId).then((res) => {
      setActiveConversation(res.payload);
    });
  }, [activeId]);

  const sendMessage = () => {
    if (!activeConversation || !composer.trim()) return;

    MessagingApi.sendMessage<Message>(activeId, { text: composer }).then((res) => {
      setComposer("");
      setActiveConversation((current) => {
        if (!current) return undefined;
        return {
          ...current,
          messages: [...(current.messages || []), res.payload],
        };
      });
    });
  };

  return singleChat ? (
    <Chat
      active={activeConversation}
      composer={composer}
      setComposer={setComposer}
      sendMessage={sendMessage}
      singleChat={singleChat}
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
        />
      </div>
    </div>
  );
};

export default MessagingView;
