import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { commonInputClasses } from "src/utils/consts";

type Option = { value: string; label?: string };

type FinalInput = InputProps & {
  options: Option[];
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
};

const SelectAddInput: React.FC<FinalInput> = ({
  options = [],
  value = "",
  onChange,
  placeholder,
  className = "",
  sizing = "sm",
  ...input
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [localOptions, setLocalOptions] = useState<Option[]>(
    [...options, { value, label: value }].reduce<Option[]>(
      (final, option) =>
        final.findIndex((f) => f.value === option.value) >= 0 ? final : [...final, option],
      []
    )
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const finalPlaceholder = placeholder || t("Global.Form.Labels.PleaseSelect");

  const filteredOptions = localOptions.filter((opt) =>
    (opt.label ?? opt.value).toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange?.(val);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleCreate = () => {
    const newOption = { value: searchTerm, label: searchTerm };
    const updated = [...localOptions, newOption];

    setLocalOptions(updated);
    handleSelect(searchTerm);
  };

  return (
    <div className={`dropdown w-100 position-relative`}>
      <input
        type="text"
        className={`form-control form-control-${sizing} ${commonInputClasses} ${className}`}
        placeholder={finalPlaceholder}
        value={searchTerm || localOptions.find((opt) => opt.value === value)?.label || ""}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        {...input}
      />

      {showDropdown && (
        <ul
          className="dropdown-menu show w-100"
          style={{ maxHeight: "200px", overflowY: "auto", zIndex: 10 }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <li key={i}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label ?? opt.value}
                </button>
              </li>
            ))
          ) : searchTerm.trim() ? (
            <li>
              <button className="dropdown-item text-dark" type="button" onClick={handleCreate}>
                + {t("Global.Form.Labels.Add")} &quot;{searchTerm}&quot;
              </button>
            </li>
          ) : (
            <li className="dropdown-item text-muted">{t("Global.Form.Labels.NoOptions")}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectAddInput;
