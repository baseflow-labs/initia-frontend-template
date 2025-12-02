import { faEllipsisVertical, faPaperclip, faPaperPlane, faPhone, faSearch, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string; // e.g., "10:24"
};

type Conversation = {
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

const MessagingView = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(sampleConversations[0].id);
  const [composer, setComposer] = useState("");

  const conversations = useMemo(() => {
    if (!query) return sampleConversations;
    return sampleConversations.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const active = useMemo(
    () => sampleConversations.find((c) => c.id === activeId)!,
    [activeId]
  );

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

  return (
    <Fragment>
      <div className="container-fluid py-3">
        <div className="row g-3">
          {/* Sidebar */}
          <div className="col-lg-4 col-xl-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <FontAwesomeIcon icon={faSearch} className="text-muted" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search chats or messages"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Chats</h6>
                  <button className="btn btn-sm btn-outline-secondary">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>

                <div className="list-group">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      className={`list-group-item list-group-item-action d-flex align-items-center ${
                        c.id === activeId ? "active" : ""
                      }`}
                      onClick={() => setActiveId(c.id)}
                    >
                      <div className="flex-shrink-0 me-3">
                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                          <span className="text-primary fw-bold">
                            {c.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-start">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold">{c.name}</span>
                          <small className="text-muted">{c.lastTime}</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted text-truncate" style={{ maxWidth: 180 }}>
                            {c.lastMessage}
                          </small>
                          {c.unread ? (
                            <span className="badge rounded-pill bg-primary">{c.unread}</span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-lg-8 col-xl-9">
            <div className="card shadow-sm h-100">
              {/* Chat Header */}
              <div className="card-header bg-light">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                    <span className="text-primary fw-bold">
                      {active.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{active.name}</h6>
                    <small className="text-muted">Online</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      <FontAwesomeIcon icon={faPhone} />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <FontAwesomeIcon icon={faVideo} />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="card-body" style={{ height: "55vh", overflowY: "auto" }}>
                {active.messages.map((m) => (
                  <div key={m.id} className={`d-flex mb-3 ${m.senderId === "me" ? "justify-content-end" : "justify-content-start"}`}>
                    {m.senderId !== "me" && (
                      <div className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-2" style={{ width: 32, height: 32 }}>
                        <span className="text-secondary small fw-bold">{active.name[0]}</span>
                      </div>
                    )}
                    <div className={`p-2 rounded ${m.senderId === "me" ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "70%" }}>
                      <div className="small">{m.text}</div>
                      <div className={`small ${m.senderId === "me" ? "text-white-50" : "text-muted"}`}>{m.time}</div>
                    </div>
                    {m.senderId === "me" && (
                      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center ms-2" style={{ width: 32, height: 32 }}>
                        <span className="text-primary small fw-bold">ME</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Composer */}
              <div className="card-footer bg-white">
                <div className="input-group">
                  <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faSmile} />
                  </button>
                  <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon={faPaperclip} />
                  </button>
                  <input
                    className="form-control"
                    placeholder="Type a message"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button className="btn btn-primary" type="button" onClick={sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} className="me-1" /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MessagingView;
