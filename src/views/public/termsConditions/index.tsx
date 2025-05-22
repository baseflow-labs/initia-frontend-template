import { useTranslation } from "react-i18next";
import Button from "../../../components/core/button";

const TermsConditions = () => {
  const { t } = useTranslation();

  const contents = [
    {
      title: "Title 1",
      intro: "This is about introduction...",
      points: ["this is it", "that is all"],
    },
    {
      title: "Title 2",
      intro: "This is about introduction...",
      points: ["this is it", "that is all"],
    },
  ];

  return (
    <div>
      {contents.map(({ title, intro, points }, i) => (
        <div className="card p-2 mb-3 text-start" key={i}>
          <h4 className="mb-2">{title}</h4>
          <h5 className="mb-2">{intro}</h5>

          <ul>
            {points.map((point, y) => (
              <li key={y}>
                <h6>{point}</h6>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Button rounded={3} route="/register">
        {t("Global.Labels.Back")}
      </Button>
    </div>
  );
};

export default TermsConditions;
