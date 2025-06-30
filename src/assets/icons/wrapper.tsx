import { takePhotoIcon } from "./icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: typeof takePhotoIcon;
  height?: number;
}

const IconWrapperComp = ({ icon, height, className }: Props) => {
  return (
    <img src={icon} height={height || 20} className={`my-auto ${className}`} />
  );
};

export default IconWrapperComp;
