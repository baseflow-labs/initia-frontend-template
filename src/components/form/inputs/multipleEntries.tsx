import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, useFormikContext } from "formik";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import Button from "../../core/button";
import InputComp from "../Input";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

type CellValue = string | number | boolean | string[] | null | undefined;
type RowType = Record<string, CellValue> & { _locked?: boolean };

const MultipleEntriesInput: React.FC<FinalInput> = (input) => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<Record<string, unknown>>();

  const rows: RowType[] = (
    Array.isArray(values[input.name]) ? (values[input.name] as RowType[]) : []
  ) as RowType[];
  const columns = useMemo(() => (input.inputs || []) as InputProps[], [input.inputs]);

  // Ensure FieldArray base exists (only once)
  useEffect(() => {
    if (!Array.isArray(values[input.name])) {
      setFieldValue(input.name, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [draft, setDraft] = useState<RowType>({});

  const extractValue = (evtOrValue: unknown): CellValue => {
    if (typeof evtOrValue === "object" && evtOrValue !== null && "target" in evtOrValue) {
      const target = (evtOrValue as { target?: { value?: unknown } }).target;
      return (target?.value as CellValue) ?? "";
    }
    return evtOrValue as CellValue;
  };

  const isRowValid = (row: RowType) => {
    return columns.every((col) => {
      if (!col.required) return true;
      const v = row?.[col.name as string];
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "number") return !Number.isNaN(v);
      return v !== undefined && v !== null && String(v).trim().length > 0;
    });
  };

  const handleDelete = (remove: (index: number) => void, index: number) => {
    remove(index);
  };

  const handleSaveDraftAndAdd = (push: (obj: RowType) => void, e?: React.MouseEvent) => {
    e?.preventDefault(); // in case button ends up in a <form>
    if (!isRowValid(draft)) {
      // (Optional) surface a UI hint; draft is not Formik-bound, so no touched
      return;
    }
    push({ ...draft, _locked: true });
    setDraft({});
  };

  const normalizeDraftValue = (col: InputProps): string | number | string[] | undefined => {
    const v = draft[col.name as string];
    if (v !== undefined && v !== null) return v as string | number | string[] | undefined;
    if (col.type === "selectMany") return [];
    return "";
  };

  return (
    <FieldArray name={input.name}>
      {({ remove, push }) => (
        <Fragment>
          <div className="table-responsive w-100">
            <table className="table align-middle">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.name} className="text-nowrap">
                      {col.label ?? col.name}
                      {col.required ? <span className="text-danger"> *</span> : null}
                    </th>
                  ))}
                  <th className="text-nowrap">{t("Global.Labels.Action")}</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-muted text-center">
                      {t("Global.Labels.NoData")}
                    </td>
                  </tr>
                ) : (
                  rows.map((row, i) => {
                    const locked = !!row?._locked;
                    return (
                      <tr key={i}>
                        {columns.map((col) => (
                          <td key={`${i}-${col.name}`}>
                            <InputComp
                              {...col}
                              name={`${input.name}[${i}].${col.name}`}
                              type={col.type}
                              disabled={locked || col.disabled}
                            />
                          </td>
                        ))}
                        <td>
                          <Button
                            color="ghost"
                            text="danger"
                            size="sm"
                            onClick={() => handleDelete(remove, i)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              <tfoot>
                <tr>
                  {columns.map((col) => (
                    <td key={`draft-${col.name}`} className="pt-5">
                      <InputComp
                        {...col}
                        bypassFormik
                        name={`__draft__${input.name}.${col.name}`}
                        type={col.type}
                        value={normalizeDraftValue(col)}
                        onChange={(e) => {
                          const v = extractValue(e);
                          setDraft((d) => ({ ...d, [col.name as string]: v }));
                        }}
                        required={false}
                        aria-required={!!col.required}
                      />
                    </td>
                  ))}

                  <td className="pt-5">
                    <Button color="success" onClick={(e) => handleSaveDraftAndAdd(push, e)}>
                      <FontAwesomeIcon icon={faAdd} />
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Fragment>
      )}
    </FieldArray>
  );
};

export default MultipleEntriesInput;
