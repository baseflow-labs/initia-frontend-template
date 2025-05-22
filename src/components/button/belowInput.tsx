const BelowInputButton = ({
  introText,
  buttonText,
  action,
}: {
  introText?: string;
  buttonText: string;
  action: any;
}) => {
  return (
    <div className="pb-0 mb-0 mt-3">
      <small className="pt-2">
        {introText}{" "}
        <span
          role="button"
          onClick={action}
          className="text-decoration-underline text-info"
        >
          {buttonText}
        </span>
      </small>
    </div>
  );
};

export default BelowInputButton;
