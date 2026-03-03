import { FormikProps } from "formik";

import Form, { InputProps } from ".";

export interface FormSchemaField extends Omit<InputProps, "name"> {
  name: string;
}

export interface FormSchemaSection {
  title?: string;
  fields: FormSchemaField[];
}

export interface FormSchema {
  draftKey?: string;
  sections: FormSchemaSection[];
}

const flattenSchemaToInputs = (schema: FormSchema): InputProps[] => {
  return schema.sections.flatMap((section) =>
    section.fields.map((field) => ({
      ...field,
      section: field.section || section.title,
    }))
  );
};

const SchemaDrivenForm = ({
  schema,
  initialValues,
  onSubmit,
}: {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  onSubmit?: (values?: Record<string, unknown>, reset?: () => void) => void;
}) => {
  const inputs = () => flattenSchemaToInputs(schema);

  return (
    <Form
      inputs={inputs as (formik: FormikProps<Record<string, unknown>>) => InputProps[]}
      initialValues={initialValues}
      onFormSubmit={onSubmit}
      enableDraft
      draftKey={schema.draftKey || "schema-driven-form"}
    />
  );
};

export default SchemaDrivenForm;
