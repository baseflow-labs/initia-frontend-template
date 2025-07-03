import { Form as FormikForm, FormikProvider, useFormik } from "formik";
import { Fragment } from "react/jsx-runtime";

import { filterIcon, resetFilterIcon } from "../../assets/icons/icons";
import IconWrapperComp from "../../assets/icons/wrapper";
import ActionButtons from "../../components/button/actionButtons";
import Button from "../../components/core/button";
import SelectInput from "../../components/form/inputs/select";
import SelectManyInput from "../../components/form/inputs/selectMany";

interface Props {
  title: string;
  filters?: {
    name: string;
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons?: { label: string; className?: string; onClick?: () => void }[];
  onSearch: (values: {}) => void;
  children: React.ReactNode;
}

const PageTemplate = ({
  title,
  filters,
  actionButtons,
  onSearch,
  children,
}: Props) => {
  const initialValues =
    filters?.reduce(
      (final, current) => ({ ...final, [current.name]: "" }),
      {}
    ) || {};

  const formik = useFormik<Record<string, any>>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSearch?.(values);
    },
    onReset: () => {
      onSearch?.(initialValues);
    },
  });

  const columnsWidth = (count: number) => {
    switch (count) {
      case 1:
        return 6;
      case 2:
        return 4;
      default:
        return 3;
    }
  };

  return (
    <Fragment>
      <div className="row w-100">
        <div className="col-6 col-lg-3 order-2 order-lg-1">
          <h3 className="mt-4 mt-lg-0">{title}</h3>
        </div>

        <div className="col-xs-12 col-lg-7 order-1 order-lg-2">
          {filters?.length && (
            <FormikProvider value={formik}>
              <FormikForm className="text-start row g-3">
                {filters?.map(({ name, label, options, multi }, i) =>
                  multi ? (
                    <div
                      className={`col-6 col-lg-${columnsWidth(filters.length)}`}
                    >
                      <SelectManyInput
                        name={name}
                        placeholder={label}
                        options={options}
                        className="me-2"
                        key={i}
                      />
                    </div>
                  ) : (
                    <div
                      className={`col-6 col-lg-${columnsWidth(filters.length)}`}
                    >
                      <SelectInput
                        id={name}
                        name={name}
                        placeholder={label}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        options={options}
                        className="me-2"
                        key={i}
                      />
                    </div>
                  )
                )}

                <div
                  className={`col-6 d-flex col-lg-${columnsWidth(
                    filters?.length || 1
                  )}`}
                >
                  <Button color="ghost" type="submit">
                    <IconWrapperComp
                      icon={filterIcon}
                      className="me-1 my-auto px-0 px-lg-1"
                    />
                  </Button>

                  <Button
                    color="ghost"
                    type="button"
                    onClick={() => formik.resetForm()}
                  >
                    <IconWrapperComp
                      icon={resetFilterIcon}
                      className="me-1 my-auto px-0 px-lg-1"
                    />
                  </Button>
                </div>
              </FormikForm>
            </FormikProvider>
          )}
        </div>

        <div className="col-6 col-lg-2 order-3 order-lg-3">
          {actionButtons && (
            <div className="float-end mt-3 mt-lg-0">
              <ActionButtons buttons={actionButtons} />
            </div>
          )}
        </div>
      </div>

      <div className="col-12 order-4 order-lg-4 py-4">{children}</div>
    </Fragment>
  );
};

export default PageTemplate;
