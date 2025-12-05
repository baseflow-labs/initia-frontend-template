import { useNavigate } from "react-router";

const BelowInputButton = ({
  introText,
  buttonText,
  route,
  action,
}: {
  introText?: string;
  buttonText: string;
  route?: string;
  action?: (data?: any) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="pb-0 mb-0 mt-3">
      <small className="pt-2">
        {introText}{" "}
        <span
          role="button"
          onClick={route ? () => navigate(route) : action}
          className="text-decoration-underline text-primary"
        >
          {buttonText}
        </span>
      </small>
    </div>
  );
};

export default BelowInputButton;
