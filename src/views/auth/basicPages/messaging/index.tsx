import { useMemo, useState } from "react";

import Chat from "./Chat";
import Sidebar from "./Sidebar";

export type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string; // e.g., "10:24"
};

export type Conversation = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  messages: Message[];
};

const sampleConversations: Conversation[] = [
  {
    id: "c1",
    name: "Jane Cooper",
    lastMessage: "Sure, I’ll send it over.",
    lastTime: "10:24",
    unread: 2,
    messages: [
      { id: "m1", senderId: "me", text: "Hey Jane 👋", time: "10:20" },
      { id: "m2", senderId: "c1", text: "Hi! How can I help?", time: "10:21" },
      { id: "m3", senderId: "me", text: "Can you share the report?", time: "10:22" },
      { id: "m4", senderId: "c1", text: "Sure, I’ll send it over.", time: "10:24" },
    ],
  },
  {
    id: "c2",
    name: "Dev Team",
    lastMessage: "Standup in 10 mins",
    lastTime: "09:45",
    messages: [
      { id: "m1", senderId: "c2", text: "Build passed ✅", time: "09:40" },
      { id: "m2", senderId: "me", text: "Great!", time: "09:41" },
      { id: "m3", senderId: "c2", text: "Standup in 10 mins", time: "09:45" },
    ],
  },
  {
    id: "c3",
    name: "Support",
    lastMessage: "Ticket updated",
    lastTime: "Yesterday",
    messages: [
      { id: "m1", senderId: "me", text: "Following up on ticket #123", time: "16:05" },
      { id: "m2", senderId: "c3", text: "Ticket updated — please check.", time: "16:10" },
    ],
  },
];

const MessagingView = ({ singleChat }: { singleChat?: boolean }) => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(sampleConversations[0].id);
  const [composer, setComposer] = useState("");

  const conversations = useMemo(() => {
    if (!query) return sampleConversations;
    return sampleConversations.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const active = useMemo(() => sampleConversations.find((c) => c.id === activeId)!, [activeId]);

  const sendMessage = () => {
    const text = composer.trim();
    if (!text) return;
    active.messages.push({
      id: `m-${Date.now()}`,
      senderId: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setComposer("");
  };

  return singleChat ? (
    <Chat
      active={active}
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
          active={active}
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
