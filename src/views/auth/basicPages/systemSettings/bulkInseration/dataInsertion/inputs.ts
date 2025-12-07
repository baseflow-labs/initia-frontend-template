export const inputs = (t: Function) => () => [
  {
    name: "dataFile",
    label: t("Auth.Settings.Admin.BulkDataInsertion.DataFileUpload"),
    type: "file",
  },
];
