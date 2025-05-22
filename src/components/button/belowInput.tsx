import { useAppSelector } from "../../store/hooks";

const BelowInputButton = ({
  introText,
  buttonText,
  action,
}: {
  introText?: string;
  buttonText: string;
  action: any;
}) => {
  const { loading } = useAppSelector((state) => state.loading);

  return (
    <div className="pb-0 mb-0 mt-3">
      <small className="pt-2">
        {introText}{" "}
        <span
          role="button"
          onClick={loading ? undefined : action}
          className="text-decoration-underline text-info"
        >
          {buttonText}
        </span>
      </small>
    </div>
  );
};

export default BelowInputButton;
