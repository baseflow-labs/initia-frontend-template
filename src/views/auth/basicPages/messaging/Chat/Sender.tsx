
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface Props {
  composer: string;
  setComposer: (value: string) => void;
  sendMessage: () => void;
}

const MessagingChatSenderView = ({composer, setComposer, sendMessage} : Props) => {
  const { t } = useTranslation();

  return (
    <div className="input-group">
      {/* <button className="btn btn-outline-secondary" type="button">
        <FontAwesomeIcon icon={faSmile} />
      </button>

      <button className="btn btn-outline-secondary" type="button">
        <FontAwesomeIcon icon={faPaperclip} />
      </button> */}

      <input
        className="form-control"
        placeholder={t("Auth.Messaging.TypeAMessage")}
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
        <FontAwesomeIcon icon={faPaperPlane} className="me-1" /> {t("Auth.Messaging.Send")}
      </button>
    </div>
  );
};

export default MessagingChatSenderView;
