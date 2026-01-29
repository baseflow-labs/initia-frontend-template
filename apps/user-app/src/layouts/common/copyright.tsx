import * as packageJson from "../../../package.json";

const CopyRightView = () => {
  const fixedText = {
    Owner: "Baseflow Labs",
    By: "By",
  };

  return (
    <small>
      <span className="text-muted">V.{packageJson.version}</span> {fixedText.By}{" "}
      <a href="https://github.com/baseflow-labs" target="_blank" rel="noopener noreferrer">
        {fixedText.Owner}
      </a>
    </small>
  );
};

export default CopyRightView;
