import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

interface Props {
  label: string;
  children: React.ReactNode;
}

const TooltipComp = ({ label, children }: Props) => {
  const iconRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (iconRef.current) {
      // clean up any existing tooltip
      const tooltip = new Tooltip(iconRef.current);
      return () => {
        tooltip.dispose();
      };
    }
  }, []);

  return (
    <span
      ref={iconRef}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={label}
    >
      {children}
    </span>
  );
};

export default TooltipComp;
