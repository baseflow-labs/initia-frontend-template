import { useState, useCallback } from "react";

import { queryPresetsManager, QueryPreset } from "./queryPresetsManager";
import "./style.scss";

interface QueryPresetsManagerProps {
  pageUrl: string;
  currentQuery: QueryPreset["query"];
  onLoadPreset: (preset: QueryPreset) => void;
  onSavePreset: (name: string) => void;
}

const QueryPresetsComponent = ({
  pageUrl,
  currentQuery,
  onLoadPreset,
  onSavePreset,
}: QueryPresetsManagerProps) => {
  const [presets, setPresets] = useState<QueryPreset[]>(
    queryPresetsManager.getPagePresets(pageUrl)
  );
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSavePreset = useCallback(() => {
    if (!presetName.trim()) return;

    queryPresetsManager.savePreset({
      name: presetName,
      pageUrl,
      query: currentQuery,
    });

    setPresets(queryPresetsManager.getPagePresets(pageUrl));
    setPresetName("");
    setShowSaveDialog(false);
    onSavePreset(presetName);
  }, [presetName, pageUrl, currentQuery, onSavePreset]);

  const handleLoadPreset = (preset: QueryPreset) => {
    onLoadPreset(preset);
    setShowMenu(false);
  };

  const handleDeletePreset = (presetId: string) => {
    queryPresetsManager.deletePreset(pageUrl, presetId);
    setPresets(queryPresetsManager.getPagePresets(pageUrl));
  };

  const handleSetDefault = (presetId: string) => {
    queryPresetsManager.setDefaultPreset(pageUrl, presetId);
    setPresets(queryPresetsManager.getPagePresets(pageUrl));
  };

  const defaultPreset = presets.find((p) => p.isDefault);

  return (
    <div className="query-presets">
      <div className="query-presets__controls">
        <button
          className="query-presets__btn query-presets__btn--save"
          onClick={() => setShowSaveDialog(true)}
          title="Save current query as preset"
        >
          <i className="fas fa-bookmark"></i> Save Preset
        </button>

        {defaultPreset && (
          <button
            className="query-presets__btn query-presets__btn--load"
            onClick={() => handleLoadPreset(defaultPreset)}
            title={`Load default: ${defaultPreset.name}`}
          >
            <i className="fas fa-star"></i> {defaultPreset.name}
          </button>
        )}

        <div className="query-presets__menu-wrapper">
          <button
            className="query-presets__btn query-presets__btn--menu"
            onClick={() => setShowMenu(!showMenu)}
            title="Show all presets"
          >
            <i className="fas fa-chevron-down"></i>
          </button>

          {showMenu && (
            <div className="query-presets__dropdown">
              {presets.length > 0 ? (
                <div className="query-presets__list">
                  {presets.map((preset) => (
                    <div key={preset.id} className="query-presets__item">
                      <button
                        className="query-presets__item-name"
                        onClick={() => handleLoadPreset(preset)}
                        title={`Load preset: ${preset.name}`}
                      >
                        {preset.isDefault && (
                          <i className="fas fa-star query-presets__item-icon"></i>
                        )}
                        {preset.name}
                      </button>
                      <div className="query-presets__item-actions">
                        {!preset.isDefault && (
                          <button
                            className="query-presets__item-action"
                            onClick={() => handleSetDefault(preset.id)}
                            title="Set as default"
                          >
                            <i className="fas fa-star-outlined"></i>
                          </button>
                        )}
                        <button
                          className="query-presets__item-action query-presets__item-action--delete"
                          onClick={() => handleDeletePreset(preset.id)}
                          title="Delete preset"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="query-presets__empty">No presets saved</div>
              )}
            </div>
          )}
        </div>
      </div>

      {showSaveDialog && (
        <div className="query-presets__modal-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="query-presets__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="query-presets__modal-title">Save Query Preset</h3>
            <input
              type="text"
              className="query-presets__modal-input"
              placeholder="Enter preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSavePreset();
              }}
              autoFocus
            />
            <div className="query-presets__modal-actions">
              <button
                className="query-presets__modal-btn query-presets__modal-btn--cancel"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </button>
              <button
                className="query-presets__modal-btn query-presets__modal-btn--save"
                onClick={handleSavePreset}
                disabled={!presetName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryPresetsComponent;
