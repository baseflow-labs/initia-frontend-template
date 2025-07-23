import TooltipComp from "../../components/tooltip";
import { takePhotoIcon } from "./icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: typeof takePhotoIcon;
  height?: number;
  label?: string;
}

const TooltipIcon = ({ icon, height = 20, className = "", label }: Props) => {
  if (label) {
    return (
      <TooltipComp label={label}>
        <img
          src={icon}
          className={`my-auto ${className}`}
          height={height}
          alt="icon"
        />
      </TooltipComp>
    );
  }

  return (
    <img
      src={icon}
      className={`my-auto ${className}`}
      height={height}
      alt="icon"
    />
  );
};

export default TooltipIcon;
