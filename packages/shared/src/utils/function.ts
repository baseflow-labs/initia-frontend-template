import { AxiosError } from "axios";

import { TFunction } from "i18next";

export const apiCatchGlobalHandler = (err: AxiosError | unknown) => console.error({ err });

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
    case "ApprovedByAccountant":
    case "AllowedByCeo":
    case "SecondedByHod":
    case "RecommendedByResearcher":
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

export const commaNumbers = (number: string) => parseFloat(number).toLocaleString("en-US");

export const pluralLabelResolve = (t: TFunction, count: number, standardLabel: string) => {
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

export const applyRouteChanges = (
  t: TFunction,
  authRoutes: { route: string; name: string }[],
  pathname: string
) => {
  // Change document title based on route
  const base = t("CopyRight.AppName");
  const page = authRoutes.find(({ route }) => route === pathname)?.name;
  document.title = page ? `${base} – ${page}` : base;

  // Scroll to top on route change
  window.scrollTo(0, 0);
};

export const covertCamelCaseToSentence = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const capitalizeSentence = (sentence: string) => {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
