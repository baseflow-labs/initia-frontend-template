import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFilter, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form as FormikForm, FormikProvider, useFormik } from "formik";

import ActionButtons from "../../components/button/actionButtons";
import Button from "../../components/core/button";
import SelectInput from "../../components/form/inputs/select";
import SelectManyInput from "../../components/form/inputs/selectMany";
import DynamicTable, { TableProps } from "../../components/table";
import ColumnsPage from "./columnsPage";

interface Props extends TableProps {
  title: string;
  filters?: {
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons?: { label: string }[];
  onSearch: (values: {}) => void;
  tableActions?: {
    label: string;
    icon: IconProp;
    spread?: boolean;
    onClick: (data: string | object) => void;
  }[];
}

const TablePage = ({
  title,
  filters,
  actionButtons,
  columns,
  data,
  onPageChange,
  onSearch,
  tableActions,
}: Props) => {
  const formik = useFormik<Record<string, any>>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {
      onSearch?.(values);
    },
  });

  return (
    <div>
      <ColumnsPage>
        <div className="col-md-3">
          <h3>{title}</h3>
        </div>

        <div className="col-md-7">
          <FormikProvider value={formik}>
            <FormikForm className="text-start">
              <div className="d-flex">
                {filters?.map(({ label, options, multi }, i) =>
                  multi ? (
                    <SelectManyInput
                      name={label}
                      placeholder={label}
                      options={options}
                      className="me-2"
                      key={i}
                    />
                  ) : (
                    <SelectInput
                      name={label}
                      placeholder={label}
                      options={options}
                      className="me-2"
                      key={i}
                    />
                  )
                )}

                <Button color="ghost" type="submit">
                  <FontAwesomeIcon icon={faFilter} className="me-1 my-auto" />
                </Button>

                <Button color="ghost" type="button">
                  <FontAwesomeIcon icon={faHistory} className="me-1 my-auto" />
                </Button>
              </div>
            </FormikForm>
          </FormikProvider>
        </div>

        <div className="col-md-2 my-auto">
          {actionButtons && (
            <div className="float-end">
              <ActionButtons buttons={actionButtons} />
            </div>
          )}
        </div>
      </ColumnsPage>

      <DynamicTable
        columns={columns}
        data={data}
        onPageChange={onPageChange}
        actions={tableActions}
      />
    </div>
  );
};

export default TablePage;
