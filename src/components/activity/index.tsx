import { Activity as ReactActivity } from "react";

const Activity = ({ condition, children }: { condition: boolean; children: React.ReactNode }) => {
  return <ReactActivity mode={condition ? "visible" : "hidden"}>{children}</ReactActivity>;
};

export default Activity;
