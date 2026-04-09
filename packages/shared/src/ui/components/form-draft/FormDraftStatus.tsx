import "./style.scss";

interface FormDraftStatusProps {
  saveStatus: "idle" | "saving" | "saved";
  hasDraft: boolean;
  draftTime?: number;
  onResume?: () => void;
  onDiscard?: () => void;
  showRestorePrompt?: boolean;
}

const FormDraftStatus = ({
  saveStatus,
  hasDraft,
  draftTime,
  onResume,
  onDiscard,
  showRestorePrompt = false,
}: FormDraftStatusProps) => {
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="form-draft-status">
      {/* Auto-save status indicator */}
      <div className={`form-draft-status__indicator form-draft-status__indicator--${saveStatus}`}>
        <span className="form-draft-status__indicator-dot"></span>
        <span className="form-draft-status__indicator-text">
          {saveStatus === "saving" && "Saving..."}
          {saveStatus === "saved" && "Draft saved"}
          {saveStatus === "idle" && hasDraft && "Draft exists"}
        </span>
      </div>

      {/* Restore draft prompt */}
      {showRestorePrompt && hasDraft && (
        <div className="form-draft-status__prompt">
          <div className="form-draft-status__prompt-content">
            <span className="form-draft-status__prompt-text">
              Restore your previous form? ({formatTime(draftTime)})
            </span>
            <div className="form-draft-status__prompt-actions">
              <button
                className="form-draft-status__prompt-btn form-draft-status__prompt-btn--restore"
                onClick={onResume}
              >
                Restore
              </button>
              <button
                className="form-draft-status__prompt-btn form-draft-status__prompt-btn--discard"
                onClick={onDiscard}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDraftStatus;
