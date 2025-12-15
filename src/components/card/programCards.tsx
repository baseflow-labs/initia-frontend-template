import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { pluralLabelResolve } from "@/utils/function";
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
    <FontAwesomeIcon icon={faDollar} height={big ? 25 : 15} className="ms-1" />
  ) : (
    pluralLabelResolve(t, amount, "Auth.Aids.AidPiece")
  );

const ProgramCards = ({ programs }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="row">
      {programs.map(({ name, type, credit, balance, sponsor }, i) => {
        return (
          <div className="col-sm-3 col-xl-6" key={i}>
            <DashboardCard>
              <div className="card-body p-0">
                <h3>{name}</h3>

                <h1>
                  {balance} <AidUnit t={t} type={type} amount={balance} big />
                </h1>

                <h5 className="text-primary">
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
