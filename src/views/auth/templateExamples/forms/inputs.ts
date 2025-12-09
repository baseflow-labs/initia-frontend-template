const inputOptions = (t: Function) => [
  { label: t("Auth.Examples.Form.Option1"), value: "option1" },
  { label: t("Auth.Examples.Form.Option2"), value: "option2" },
  { label: t("Auth.Examples.Form.Option3"), value: "option3" },
];

export const inputs = (t: Function) => [
  {
    type: "text",
    name: "text",
    label: t("Auth.Examples.Form.Text"),
  },
  {
    type: "phoneNumber",
    name: "phoneNumber",
    label: t("Auth.Examples.Form.PhoneNumber"),
  },
  {
    type: "email",
    name: "email",
    label: t("Auth.Examples.Form.Email"),
  },
  {
    type: "password",
    name: "password",
    label: t("Auth.Examples.Form.Password"),
  },
  {
    type: "number",
    name: "number",
    label: t("Auth.Examples.Form.Number"),
  },
  {
    type: "numberText",
    name: "numberText",
    label: t("Auth.Examples.Form.NumberText"),
  },
  {
    type: "otp",
    name: "otp",
    label: t("Auth.Examples.Form.OTP"),
  },
  {
    type: "textarea",
    name: "textarea",
    label: t("Auth.Examples.Form.Textarea"),
  },
  {
    type: "date",
    name: "date",
    label: t("Auth.Examples.Form.Date"),
  },
  {
    type: "file",
    name: "file",
    label: t("Auth.Examples.Form.File"),
  },
  {
    type: "location",
    name: "location",
    label: t("Auth.Examples.Form.Location"),
  },
  {
    type: "radio",
    name: "radio",
    label: t("Auth.Examples.Form.Radio"),
    options: inputOptions(t),
  },
  {
    type: "checkbox",
    name: "checkbox",
    label: t("Auth.Examples.Form.Checkbox"),
  },
  {
    type: "checkboxes",
    name: "checkboxes",
    label: t("Auth.Examples.Form.Checkboxes"),
    options: inputOptions(t),
  },
  {
    type: "checkboxes",
    name: "checkboxes",
    label: t("Auth.Examples.Form.StackedCheckboxes"),
    stacked: true,
    options: inputOptions(t),
  },
  {
    type: "select",
    name: "select",
    label: t("Auth.Examples.Form.Select"),
    options: inputOptions(t),
  },
  {
    type: "selectMany",
    name: "selectMany",
    label: t("Auth.Examples.Form.SelectMany"),
    options: inputOptions(t),
  },
  {
    type: "multipleEntries",
    name: "multipleEntries",
    label: t("Auth.Examples.Form.MultipleEntries"),
    fullWidth: true,
    inputs: [
      { type: "text", name: "entryTitle", label: t("Auth.Examples.Form.Text") },
      {
        type: "number",
        name: "entryValue",
        label: t("Auth.Examples.Form.Number"),
      },
    ],
  },
];
