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
