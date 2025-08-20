import { useTranslation } from "react-i18next";

import { riyalIcon } from "../../assets/icons/icons";
import {
  pluralLabelResolve,
  renderDataFromOptions,
} from "../../utils/function";
import DashboardCard from "./dashboardCard";

interface Props {
  programs: {
    name: string;
    type: string;
    credit: number;
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

export const AidUnit = ({
  t,
  type,
  amount,
  big,
}: {
  t: Function;
  type: string;
  amount: number;
  big?: boolean;
}) =>
  type === "Cash" ? (
    <img src={riyalIcon} height={big ? 25 : 15} className="ms-1" />
  ) : (
    pluralLabelResolve(t, amount, "Auth.Aids.AidPiece")
  );

const ProgramCards = ({ programs }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="row">
      {programs.map(({ name, type, credit, balance, sponsor }, i) => {
        return (
          <div
            className={`col-sm-${columnsMdWidth(
              programs.length
            )} col-xl-${columnsLgWidth(programs.length)}`}
            key={i}
          >
            <DashboardCard>
              <div className="card-body p-0">
                <h3>{name}</h3>

                <h1>
                  {balance} <AidUnit t={t} type={type} amount={balance} big />
                </h1>

                <h5 className="text-info">
                  {credit} <AidUnit t={t} type={type} amount={credit} />
                </h5>

                <h6 className="mt-3">{sponsor}</h6>
              </div>
            </DashboardCard>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramCards;
