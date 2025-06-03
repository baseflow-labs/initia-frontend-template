import { useAppSelector } from "../../store/hooks";
import Button from "../core/button";

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
  const { loading } = useAppSelector((state) => state.loading);

  return (
    <div className="pb-0 mb-0 mt-3">
      <small className="pt-2">
        {introText}{" "}
        <Button
          color="ghost"
          size="sm"
          type="button"
          route={route}
          onClick={route ? undefined : action}
          disabled={loading.length > 0}
          className="text-decoration-underline text-info"
        >
          {buttonText}
        </Button>
      </small>
    </div>
  );
};

export default BelowInputButton;
