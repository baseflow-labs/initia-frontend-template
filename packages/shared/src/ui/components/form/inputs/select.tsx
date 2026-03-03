import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import { InputProps } from "..";
import { commonInputClasses } from "../../../../utils/consts";
import service from "../../../../api";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: React.FC<FinalInput> = ({
  className,
  placeholder,
  options,
  searchable,
  clearable,
  apiPath,
  name,
  sizing = "sm",
  ...input
}) => {
  const { t } = useTranslation();
  const [loadedOptions, setLoadedOptions] = useState(options || []);

  useEffect(() => {
    if (!apiPath) return;
    service
      .get(apiPath)
      .then((res) => {
        const payload = Array.isArray(res?.payload)
          ? (res.payload as Array<Record<string, unknown>>)
          : [];
        const normalized = payload.map((item) => ({
          value: String(item.id ?? item.value ?? ""),
          label: String(item.name ?? item.label ?? item.value ?? item.id ?? ""),
        }));
        setLoadedOptions(normalized);
      })
      .catch(() => {
        // keep fallback static options
      });
  }, [apiPath]);

  const finalOptions = loadedOptions.length ? loadedOptions : options;

  if (searchable || clearable) {
    const reactSelectOptions =
      finalOptions?.map((option) => ({
        value: option.value,
        label: option.label ?? String(option.value),
      })) || [];

    const selected = reactSelectOptions.find((option) => option.value === input.value) || null;

    return (
      <Select
        name={name}
        className={className}
        options={reactSelectOptions}
        value={selected}
        isSearchable={searchable !== false}
        isClearable={clearable !== false}
        placeholder={placeholder || t("Global.Form.Labels.PleaseSelect")}
        onChange={(selectedOption) => {
          const value = selectedOption?.value ?? "";
          if (typeof input.onChange === "function") {
            input.onChange({
              target: { name, value },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      />
    );
  }

  return (
    <select
      {...input}
      className={`form-select form-select-${sizing} ${commonInputClasses} ${className}`}
    >
      <option value="">{placeholder || t("Global.Form.Labels.PleaseSelect")}</option>

      {finalOptions?.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
