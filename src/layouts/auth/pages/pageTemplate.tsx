import { Form as FormikForm, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import { filterIcon, resetFilterIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import ActionButtons, {
  ActionButtonProps,
} from "../../../components/button/actionButtons";
import Button from "../../../components/core/button";
import SelectInput from "../../../components/form/inputs/select";
import SelectManyInput from "../../../components/form/inputs/selectMany";
import { columnsWidth } from "../../../utils/function";
import DashboardNavbar from "../navs/navbar";

interface Props {
  title?: string;
  filters?: {
    name: string;
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons?: ActionButtonProps[];
  onGetData?: (values: {}) => void;
  children: React.ReactNode;
  onSearch?: (e: string) => void;
  searchPlaceholder?: string;
  showNav?: Boolean;
  hideHeader?: Boolean;
}

const PageTemplate = ({
  title,
  filters,
  actionButtons,
  onGetData,
  children,
  onSearch,
  searchPlaceholder,
  showNav,
  hideHeader,
}: Props) => {
  const { t } = useTranslation();

  const initialValues =
    filters?.reduce(
      (final, current) => ({ ...final, [current.name]: "" }),
      {}
    ) || {};

  const formik = useFormik<Record<string, any>>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onGetData?.(values);
    },
    onReset: () => {
      onGetData?.(initialValues);
    },
  });

  return (
    <Fragment>
      {!hideHeader && (
        <DashboardNavbar
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          showNav={showNav}
        />
      )}
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
                        placeholder={label + "..."}
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
                        placeholder={label + "..."}
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
                      label={t("Global.Form.Labels.Filter")}
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
                      label={t("Global.Form.Labels.ResetFilter")}
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

        <div className="col-12 order-4 order-lg-4 py-4">{children}</div>
      </div>
    </Fragment>
  );
};

export default PageTemplate;
