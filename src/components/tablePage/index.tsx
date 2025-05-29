import { faFilter, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form as FormikForm, FormikProvider, useFormik } from "formik";
import Button from "../core/button";
import SelectInput from "../form/inputs/select";
import SelectManyInput from "../form/inputs/selectMany";
import DynamicTable, { TableProps } from "../table";

interface Props extends TableProps {
  title: string;
  filters?: {
    label: string;
    options: { value: string; label?: string }[];
    multi?: boolean;
  }[];
  actionButtons: { label: string }[];
  onSearch: (values: {}) => void;
}

const TablePage = ({
  title,
  filters,
  actionButtons,
  columns,
  data,
  onSearch,
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
      <div className="row">
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
          <div className="float-end">
            {actionButtons.map(({ label }, i) => (
              <Button key={i}>{label}</Button>
            ))}
          </div>
        </div>
      </div>

      <DynamicTable columns={columns} data={data} />
    </div>
  );
};

export default TablePage;
