import { TFunction } from "i18next";

import tempLogo from "../../../../../public//android-chrome-192x192.png";

const inputOptions = (t: TFunction) => [
  {
    label: t("Auth.Examples.Form.Option1"),
    value: "option1",
    description: t("Auth.Examples.Form.Description"),
    image: tempLogo,
  },
  {
    label: t("Auth.Examples.Form.Option2"),
    value: "option2",
    description: t("Auth.Examples.Form.Description"),
    image: tempLogo,
  },
  {
    label: t("Auth.Examples.Form.Option3"),
    value: "option3",
    description: t("Auth.Examples.Form.Description"),
    image: tempLogo,
  },
];

export const inputs = (t: TFunction) => [
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
    type: "time",
    name: "time",
    label: t("Auth.Examples.Form.Time"),
  },
  {
    type: "datetime",
    name: "datetime",
    label: t("Auth.Examples.Form.DateTime"),
  },
  {
    type: "month",
    name: "month",
    label: t("Auth.Examples.Form.Month"),
  },
  {
    type: "year",
    name: "year",
    label: t("Auth.Examples.Form.Year"),
  },
  {
    type: "weekday",
    name: "weekday",
    label: t("Auth.Examples.Form.Weekday"),
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
    type: "color",
    name: "color",
    label: t("Auth.Examples.Form.Color"),
  },
  {
    type: "boolean",
    name: "booleanButton",
    label: t("Auth.Examples.Form.BooleanButton"),
    layout: "button",
  },
  {
    type: "boolean",
    name: "booleanCheckbox",
    label: t("Auth.Examples.Form.BooleanCheckbox"),
    layout: "checkbox",
  },
  {
    type: "boolean",
    name: "booleanSwitch",
    label: t("Auth.Examples.Form.BooleanSwitch"),
    layout: "switch",
  },
  {
    type: "rating",
    name: "starRating",
    label: t("Auth.Examples.Form.StarRating"),
    layout: "stars",
  },
  {
    type: "checkboxes",
    name: "checkboxes",
    label: t("Auth.Examples.Form.Checkboxes"),
    options: inputOptions(t),
  },
  {
    type: "checkboxes",
    name: "stackedCheckboxes",
    label: t("Auth.Examples.Form.StackedCheckboxes"),
    stacked: true,
    options: inputOptions(t),
  },
  {
    type: "checkboxes",
    name: "booleanCheckboxes",
    label: t("Auth.Examples.Form.BooleanCheckboxes"),
    layout: "button",
    options: inputOptions(t),
  },
  {
    type: "checkboxes",
    name: "stackedBooleanCheckboxes",
    label: t("Auth.Examples.Form.StackedBooleanCheckboxes"),
    layout: "button",
    stacked: true,
    options: inputOptions(t),
  },
  {
    type: "checkboxes",
    name: "cardCheckboxes",
    label: t("Auth.Examples.Form.CardCheckboxes"),
    layout: "card",
    options: inputOptions(t),
    double: true,
  },
  {
    type: "checkboxes",
    name: "stackedCardCheckboxes",
    label: t("Auth.Examples.Form.StackedCardCheckboxes"),
    layout: "card",
    stacked: true,
    options: inputOptions(t),
    double: true,
  },
  {
    type: "checkboxes",
    name: "imageCheckboxes",
    label: t("Auth.Examples.Form.ImageCheckboxes"),
    layout: "image",
    options: inputOptions(t),
    double: true,
  },
  {
    type: "checkboxes",
    name: "stackedImageCheckboxes",
    label: t("Auth.Examples.Form.StackedImageCheckboxes"),
    layout: "image",
    stacked: true,
    options: inputOptions(t),
    double: true,
  },
  {
    type: "radio",
    name: "radio",
    label: t("Auth.Examples.Form.Radio"),
    options: inputOptions(t),
  },
  {
    type: "radio",
    name: "stackedRadio",
    label: t("Auth.Examples.Form.StackedRadio"),
    stacked: true,
    options: inputOptions(t),
  },
  {
    type: "radio",
    name: "buttonRadio",
    label: t("Auth.Examples.Form.ButtonRadio"),
    layout: "button",
  },
  {
    type: "radio",
    name: "stackedButtonRadio",
    label: t("Auth.Examples.Form.StackedButtonRadio"),
    layout: "button",
    stacked: true,
    options: inputOptions(t),
  },
  {
    type: "radio",
    name: "cardRadio",
    label: t("Auth.Examples.Form.CardRadio"),
    layout: "card",
    options: inputOptions(t),
    double: true,
  },
  {
    type: "radio",
    name: "stackedCardRadio",
    label: t("Auth.Examples.Form.StackedCardRadio"),
    layout: "card",
    stacked: true,
    options: inputOptions(t),
    double: true,
  },
  {
    type: "radio",
    name: "imageRadio",
    label: t("Auth.Examples.Form.ImageRadio"),
    layout: "image",
    options: inputOptions(t),
    double: true,
  },
  {
    type: "radio",
    name: "stackedImageRadio",
    label: t("Auth.Examples.Form.StackedImageRadio"),
    layout: "image",
    stacked: true,
    options: inputOptions(t),
    double: true,
  },
  {
    type: "select",
    name: "select",
    label: t("Auth.Examples.Form.Select"),
    options: inputOptions(t),
    searchable: true,
    clearable: true,
  },
  {
    type: "select",
    name: "usersApiSelect",
    label: t("Auth.Examples.Form.UsersApiSelect"),
    apiPath: "/user?page=1&capacity=20",
    searchable: true,
    clearable: true,
  },
  {
    type: "selectMany",
    name: "selectMany",
    label: t("Auth.Examples.Form.SelectMany"),
    options: inputOptions(t),
  },
  {
    type: "range",
    name: "range",
    label: t("Auth.Examples.Form.Range"),
    min: 10,
    max: 120,
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
  {
    type: "richText",
    name: "richText",
    label: t("Auth.Examples.Form.RichText"),
    fullWidth: true,
  },
];

export const schemaInputs = (t: TFunction) => ({
  draftKey: "template-form-schema-v2",
  sections: [
    {
      title: t("Auth.Examples.Form.ProfileSection"),
      fields: [
        {
          type: "text",
          name: "fullName",
          label: t("Auth.Examples.Form.Text"),
          gridCols: 2 as const,
        },
        {
          type: "email",
          name: "workEmail",
          label: t("Auth.Examples.Form.Email"),
          gridCols: 2 as const,
        },
      ],
    },
    {
      title: t("Auth.Examples.Form.SchedulingSection"),
      fields: [
        {
          type: "date",
          name: "startDate",
          label: t("Auth.Examples.Form.StartDate"),
          gridCols: 3 as const,
        },
        {
          type: "time",
          name: "startTime",
          label: t("Auth.Examples.Form.StartTime"),
          gridCols: 3 as const,
        },
        {
          type: "weekday",
          name: "weekDay",
          label: t("Auth.Examples.Form.Weekday"),
          gridCols: 3 as const,
        },
      ],
    },
    {
      title: t("Auth.Examples.Form.ContentSection"),
      fields: [
        {
          type: "richText",
          name: "notes",
          label: t("Auth.Examples.Form.Notes"),
          fullWidth: true,
        },
      ],
    },
  ],
});
