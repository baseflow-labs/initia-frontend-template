interface Props {
  active: {
    id: string;
    name: string;
    avatar?: string;
    messages: {
      id: string;
      senderId: string;
      text: string;
      time: string;
    }[];
  };
}

const MessagingChatBodyView = ({ active }: Props) => {
  // const { t } = useTranslation();

  return (
    <div>
      {active.messages.map((m) => (
        <div
          key={m.id}
          className={`d-flex mb-3 ${m.senderId === "me" ? "justify-content-end" : "justify-content-start"}`}
        >
          {m.senderId !== "me" && (
            <div
              className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-2"
              style={{ width: 32, height: 32 }}
            >
              <span className="text-secondary small fw-bold">{active.name[0]}</span>
            </div>
          )}

          <div
            className={`p-2 rounded ${m.senderId === "me" ? "bg-primary text-white" : "bg-light"}`}
            style={{ maxWidth: "70%" }}
          >
            <div className="small">{m.text}</div>
            <div className={`small ${m.senderId === "me" ? "text-white-50" : "text-muted"}`}>
              {m.time}
            </div>
          </div>

          {m.senderId === "me" && (
            <div
              className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center ms-2"
              style={{ width: 32, height: 32 }}
            >
              <span className="text-primary small fw-bold">ME</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessagingChatBodyView;
