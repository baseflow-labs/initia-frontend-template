import { useEffect, useState, useCallback, useRef } from "react";
import "./style.scss";

export interface Command {
  id: string;
  name: string;
  description?: string;
  category?: string;
  action: () => void;
  icon?: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  commands: Command[];
  isOpen?: boolean;
  onClose?: () => void;
  placeholder?: string;
  openShortcut?: string; // e.g., "Ctrl+K" or "Cmd+K"
}

const CommandPalette = ({
  commands,
  isOpen = false,
  onClose,
  placeholder = "Type a command...",
  openShortcut = "Ctrl+K",
}: CommandPaletteProps) => {
  const [open, setOpen] = useState(isOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Ctrl+K or Cmd+K
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCtrlKOrCmdK = isMac ? e.metaKey && e.key === "k" : e.ctrlKey && e.key === "k";

      if (isCtrlKOrCmdK) {
        e.preventDefault();
        setOpen(true);
      }

      // Close with Escape
      if (e.key === "Escape" && open) {
        setOpen(false);
      }

      // Navigate with Arrow keys
      if (open && e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i < filteredCommands.length - 1 ? i + 1 : i));
      }

      if (open && e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : i));
      }

      // Execute with Enter
      if (open && e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setSelectedIndex(0);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchQuery("");
    onClose?.();
  }, [onClose]);

  const handleCommandClick = (command: Command) => {
    command.action();
    handleClose();
  };

  return (
    <>
      {open && <div className="command-palette__overlay" onClick={handleClose} />}

      <div className={`command-palette ${open ? "command-palette--open" : ""}`}>
        <div className="command-palette__header">
          <input
            ref={inputRef}
            type="text"
            className="command-palette__input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="command-palette__shortcut">{openShortcut}</span>
        </div>

        <div className="command-palette__list">
          {filteredCommands.length > 0 ? (
            <div className="command-palette__items">
              {filteredCommands.map((command, index) => (
                <div
                  key={command.id}
                  className={`command-palette__item ${index === selectedIndex ? "command-palette__item--selected" : ""}`}
                  onClick={() => handleCommandClick(command)}
                >
                  {command.icon && <i className={`command-palette__icon ${command.icon}`}></i>}
                  <div className="command-palette__item-content">
                    <div className="command-palette__item-name">{command.name}</div>
                    {command.description && (
                      <div className="command-palette__item-description">{command.description}</div>
                    )}
                  </div>
                  {command.category && (
                    <span className="command-palette__category">{command.category}</span>
                  )}
                  {command.shortcut && (
                    <span className="command-palette__shortcut-badge">{command.shortcut}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="command-palette__empty">
              <p>No commands found</p>
            </div>
          )}
        </div>

        <div className="command-palette__footer">
          <span className="command-palette__help">
            <kbd>↑↓</kbd> Navigate • <kbd>Enter</kbd> Execute • <kbd>Esc</kbd> Close
          </span>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;
