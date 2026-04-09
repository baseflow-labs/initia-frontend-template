import { useState } from "react";
import "./style.scss";

export interface SpeedDialAction {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  className?: string;
}

interface FloatingSpeedDialProps {
  actions: SpeedDialAction[];
  mainIcon?: string;
  mainLabel?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  direction?: "up" | "down" | "left" | "right";
}

const FloatingSpeedDial = ({
  actions,
  mainIcon = "+",
  mainLabel = "Menu",
  position = "bottom-right",
  direction = "up",
}: FloatingSpeedDialProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: SpeedDialAction) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <div
      className={`floating-speed-dial floating-speed-dial--${position} floating-speed-dial--${direction}`}
    >
      <div
        className="floating-speed-dial__actions"
        style={{ opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden" }}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            className={`floating-speed-dial__action ${action.className || ""}`}
            onClick={() => handleActionClick(action)}
            title={action.label}
          >
            {action.icon.startsWith("fas") ||
            action.icon.startsWith("far") ||
            action.icon.startsWith("fab") ? (
              <i className={`${action.icon} floating-speed-dial__icon`} aria-hidden="true" />
            ) : (
              <span className="floating-speed-dial__icon">{action.icon}</span>
            )}
            <span className="floating-speed-dial__tooltip">{action.label}</span>
          </button>
        ))}
      </div>

      <button className="floating-speed-dial__main" onClick={toggleMenu} title={mainLabel}>
        {mainIcon.startsWith("fas") || mainIcon.startsWith("far") || mainIcon.startsWith("fab") ? (
          <i className={`${mainIcon} floating-speed-dial__icon`} aria-hidden="true" />
        ) : (
          <span className="floating-speed-dial__icon">{mainIcon}</span>
        )}
      </button>
    </div>
  );
};

export default FloatingSpeedDial;
