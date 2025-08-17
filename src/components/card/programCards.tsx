import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { riyalIcon } from "../../assets/icons/icons";
import {
  pluralLabelResolve,
  renderDataFromOptions,
} from "../../utils/function";
import { getAidProgramTypes } from "../../utils/optionDataLists/aids";
import { MoneyUnit } from "../table";
import DashboardCard from "./dashboardCard";

interface Props {
  programs: {
    name: string;
    type: string;
    status: string;
    credit: number;
    spent: number;
    balance: number;
    sponsor: string;
  }[];
}

const columnsLgWidth = (count: number) => {
  switch (count) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    default:
      return 3;
  }
};

const columnsMdWidth = (count: number) => {
  switch (count) {
    case 1:
      return 12;
    default:
      return 6;
  }
};

const ProgramCards = ({ programs }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="row">
      {programs.map(
        ({ name, type, status, credit, spent, balance, sponsor }, i) => {
          const Unit = ({ amount, big }: { amount: number; big?: boolean }) =>
            type === "Cash" ? (
              <img src={riyalIcon} height={big ? 25 : 15} className="ms-1" />
            ) : (
              pluralLabelResolve(t, amount, "Auth.Aids.AidPiece")
            );

          return (
            <div
              className={`col-sm-${columnsMdWidth(
                programs.length
              )} col-xl-${columnsLgWidth(programs.length)}`}
              key={i}
            >
              <DashboardCard>
                <div className="card-body p-0">
                  <h6>
                    <div className="d-flex w-100 justify-content-between">
                      <h3>{name}</h3>
                      <div
                        className={`badge bg-${
                          type === "Cash" ? "warning" : "success"
                        } px-3 py-2 my-1 rounded-pill`}
                      >
                        {renderDataFromOptions(type, getAidProgramTypes(t))}
                      </div>
                    </div>
                  </h6>

                  <h1>
                    {balance} <Unit amount={balance} big />
                  </h1>

                  <h5 className="text-info">
                    {credit} <Unit amount={credit} />
                  </h5>

                  <h6 className="mt-3">{sponsor}</h6>
                </div>
              </DashboardCard>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProgramCards;
