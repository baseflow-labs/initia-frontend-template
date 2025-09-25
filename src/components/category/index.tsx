import { useTranslation } from "react-i18next";

const RenderCategory = ({ data }: { data: string }) => {
  const { t } = useTranslation();
  return (
    <small className="bg-opacity-info p-2 rounded-4 text-sm ms-2 my-auto text-info">
      {data}
    </small>
  );
};

export default RenderCategory;
