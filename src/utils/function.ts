import { AxiosError } from "axios";

export const apiCatchGlobalHandler = (err: AxiosError) => console.log({ err });

export const statusColorRender = (status = "") => {
  switch (status) {
    case "Reject":
    case "Rejected":
    case "Cancelled":
    case "Cancel":
      return "danger";
    case "Done":
    case "Accept":
    case "Granted":
    case "Accepted":
    case "Confirmed":
    case "Researcher Assigned":
      return "success";
    case "In Preview":
    case "Pending":
    case "Reviewed":
    case "Pending Approval":
      return "warning";
    case "Incomplete":
    case "Need Help":
      return "black";
    default:
      return "primary";
  }
};

export const renderDataFromOptions = (
  data: string,
  options: { label?: string; value: string }[]
) => {
  const option = options.find(({ value }) => value === data);

  return option?.label || option?.value || "";
};

export const splitOverNumberPlusLeftover = (i: number, y = 2) =>
  Math.floor(i / y) + (i % y > 0 ? 1 : 0);
