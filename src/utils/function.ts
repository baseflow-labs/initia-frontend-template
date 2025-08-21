import { AxiosError } from "axios";

export const apiCatchGlobalHandler = (err: AxiosError) => console.log({ err });

export const statusColorRender = (status = "") => {
  switch (status) {
    case "Reject":
    case "Rejected":
    case "Denied":
    case "Cancelled":
    case "Cancel":
    case "Delayed":
    case "Closed":
      return "danger";
    case "Done":
    case "Accept":
    case "Granted":
    case "Accepted":
    case "Confirmed":
    case "Opened":
    case "Researcher Assigned":
      return "success";
    case "In Preview":
    case "Pending":
    case "Reviewed":
    case "Suspended":
    case "Approved":
    case "Pending Approval":
      return "warning";
    case "Incomplete":
    case "Need Help":
      return "black";
    default:
      return "primary";
  }
};

export const booleanColorRender = (status = "No") => {
  switch (status) {
    case "Yes":
      return "success";
    default:
      return "danger";
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

export const columnsWidth = (count: number) => {
  switch (count) {
    case 1:
      return 6;
    case 2:
      return 4;
    default:
      return 3;
  }
};

export const pluralLabelResolve = (
  t: Function,
  count: number,
  standardLabel: string
) => {
  switch (count % 100) {
    case -1:
      return t(`${standardLabel}_other`);
    case 0:
      return t(`${standardLabel}_0`);
    case 1:
      return t(`${standardLabel}_1`);
    case 2:
      return t(`${standardLabel}_2`);
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return t(`${standardLabel}_few`);
    default:
      return t(`${standardLabel}_many`);
  }
};
