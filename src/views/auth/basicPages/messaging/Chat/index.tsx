import MessagingChatBodyView from "./Body";
import MessagingChatHeaderView from "./Header";
import MessagingChatSenderView from "./Sender";

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
  composer: string;
  setComposer: (value: string) => void;
  sendMessage: () => void;
  singleChat?: boolean;
}

const MessagingChatView = ({ active, composer, setComposer, sendMessage, singleChat }: Props) => {
  return (
    <div className="card shadow-sm h-100">
      {/* Chat Header */}
      {singleChat ? null : (
        <div className="card-header bg-light">
          <MessagingChatHeaderView active={active} />
        </div>
      )}

      {/* Chat Body */}
      <div
        className="card-body"
        style={{ height: singleChat ? "70vh" : "55vh", overflowY: "auto" }}
      >
        <MessagingChatBodyView active={active} />
      </div>

      <div className="card-footer bg-white">
        <MessagingChatSenderView
          composer={composer}
          setComposer={setComposer}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default MessagingChatView;
