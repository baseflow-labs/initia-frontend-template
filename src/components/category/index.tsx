import { useTranslation } from "react-i18next";

import { renderDataFromOptions } from "../../utils/function";
import { getBeneficiaryCategories } from "../../utils/optionDataLists/beneficiaries";

const RenderCategory = ({ data }: { data: string }) => {
  const { t } = useTranslation();
  return (
    <small className="bg-opacity-info p-2 rounded-4 text-sm ms-2 my-auto text-info">
      {renderDataFromOptions(data, getBeneficiaryCategories(t))}
    </small>
  );
};

export default RenderCategory;
