import Button from "../core/button";

interface Props {
  buttons: { label: string; className?: string }[];
}

const ActionButtons = ({ buttons }: Props) => {
  return (
    <div className="btn-group">
      {buttons.map(({ label, className, ...rest }, i) => (
        <Button className={`me-2 ${className}`} {...rest} key={i}>
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
