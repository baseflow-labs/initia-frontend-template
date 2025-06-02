import Button from "../core/button";

interface Props {
  buttons: { label: string }[];
}

const ActionButtons = ({ buttons }: Props) => {
  return (
    <div className="btn-group">
      {buttons.map(({ label, ...rest }, i) => (
        <Button {...rest} key={i}>
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
