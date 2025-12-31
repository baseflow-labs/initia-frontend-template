import Button from "../core/button";
import TooltipComp from "../tooltip";

export interface ActionButtonProps {
  label: string | React.ReactNode;
  tooltip?: string;
  color?: string;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
}

interface Props {
  buttons: ActionButtonProps[];
}

const ActionButtons = ({ buttons }: Props) => {
  return (
    <div className="btn-group">
      {buttons.map(({ label, className, tooltip, ...rest }, i) =>
        tooltip ? (
          <TooltipComp label={tooltip} key={i}>
            <Button className={`me-2 ${className}`} {...rest}>
              {label}
            </Button>
          </TooltipComp>
        ) : (
          <Button className={`me-2 ${className}`} {...rest} key={i}>
            {label}
          </Button>
        )
      )}
    </div>
  );
};

export default ActionButtons;
