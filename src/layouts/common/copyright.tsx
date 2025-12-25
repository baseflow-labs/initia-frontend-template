import { APP_VERSION } from "@/version";

const CopyRightView = () => {
  const fixedText = {
    Owner: "Baseflow Labs",
    By: "By",
  };

  return (
    <small>
      <span className="text-muted">V.{APP_VERSION}</span> {fixedText.By}{" "}
      <a href="https://github.com/baseflow-labs" target="_blank" rel="noopener noreferrer">
        {fixedText.Owner}
      </a>
    </small>
  );
};

export default CopyRightView;
