import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import CardComp from "../../../components/card/card";
import ProgramCards, { AidUnit } from "../../../components/card/programCards";
import { renderDataFromOptions } from "../../../utils/function";
import { getAidCategoryTypes } from "../../../utils/optionDataLists/aids";

export const CategoryView = ({
  id,
  name,
  type,
  balance,
  programs,
  t,
}: {
  id: string;
  name: string;
  type: string;
  balance: number;
  programs: {
    name: string;
    credit: number;
    sponsor: string;
    balance: number;
  }[];
  t: Function;
}) => (
  <div className="card p-4 rounded-4 mt-4">
    <div className="d-flex justify-content-between">
      <div>
        <h3 className="mb-3">{name}</h3>

        <h1>
          {balance}{" "}
          {id !== "0" && <AidUnit t={t} big type={type} amount={balance} />}
        </h1>
      </div>

      {id !== "0" && (
        <h4>
          <div className="badge bg-success p-3 px-4 rounded-pill">
            {renderDataFromOptions(type, getAidCategoryTypes(t))}
          </div>
        </h4>
      )}
    </div>

    <ProgramCards
      programs={programs
        .sort((a, b) => (a.balance > b.balance ? -1 : 1))
        .map((program) => ({ ...program, type }))}
    />
  </div>
);
interface Program {
  name: string;
  type: string;
  credit: number;
  balance: number;
  sponsor: string;
}

interface Props {
  programs: Program[];
}

const DashboardClickableCard = ({
  children,
  max,
  onClick,
  selected = false,
  titleForA11y,
}: {
  children: React.ReactNode;
  max?: string;
  onClick?: () => void;
  selected?: boolean;
  titleForA11y?: string;
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <CardComp
      className={`my-3 rounded-4 border ${
        selected ? "border-2 border-info" : "border-1"
      }`}
      style={
        max
          ? {
              maxHeight: max,
              overflowY: "auto",
              cursor: onClick ? "pointer" : "default",
            }
          : { cursor: onClick ? "pointer" : "default" }
      }
    >
      <div
        role={onClick ? "button" : undefined}
        aria-pressed={onClick ? selected : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={titleForA11y}
        className="p-0"
      >
        <Fragment>{children}</Fragment>
      </div>
    </CardComp>
  );
};

const ProgramCardsPicker = ({
  programs,
  selectedIndex,
  onSelect,
}: Props & {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="row">
      {programs.map(({ name, type, credit, balance, sponsor }, i) => {
        const selected = selectedIndex === i;

        return (
          <div className="col-sm-3 col-xl-6" key={`${name}-${i}`}>
            <DashboardClickableCard
              onClick={() => onSelect(i)}
              selected={selected}
              titleForA11y={`${t("Select program")}: ${name}`}
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h3 className="m-0">{name}</h3>
                </div>

                <h1 className="mt-2">
                  {balance} <AidUnit t={t} type={type} amount={balance} big />
                </h1>

                <h5 className="text-info">
                  {credit} <AidUnit t={t} type={type} amount={credit} />
                </h5>

                <h6 className="mt-3 text-muted">{sponsor}</h6>
              </div>
            </DashboardClickableCard>
          </div>
        );
      })}
    </div>
  );
};

export const CategoryProgramPicker = ({
  id,
  name,
  type,
  balance,
  programs,
  t,
  onPick,
}: {
  id: string;
  name: string;
  type: string;
  balance: number;
  programs: {
    id: string;
    name: string;
    credit: number;
    sponsor: string;
    balance: number;
  }[];
  t: Function;
  onPick?: (id: string) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sortedPrograms = programs
    .slice()
    .sort((a, b) => (a.balance > b.balance ? -1 : 1))
    .map((program) => ({ ...program, type }));

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const p = sortedPrograms[index];
    onPick?.(p.id);
  };

  return (
    <div className="card p-4 rounded-4 mt-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="mb-3">{name}</h3>

          <h1 className="m-0">
            {balance}{" "}
            {id !== "0" && <AidUnit t={t} big type={type} amount={balance} />}
          </h1>
        </div>

        {id !== "0" && (
          <h4 className="m-0">
            <div className="badge bg-success p-3 px-4 rounded-pill">
              {renderDataFromOptions(type, getAidCategoryTypes(t))}
            </div>
          </h4>
        )}
      </div>

      <ProgramCardsPicker
        programs={sortedPrograms}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />
    </div>
  );
};
