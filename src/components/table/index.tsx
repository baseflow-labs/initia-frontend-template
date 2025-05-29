import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { viewDateFormat } from "../../utils/consts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export interface TableProps {
  columns: {
    label: string;
    name: string;
    render?: (row: {}) => string | React.ReactNode;
    type?: string;
    options?: { value: string; label?: string }[];
  }[];
  data: {}[];
  onPageChange: (page: number, size: number) => void;
}

interface Props {
  row: object;
  data: string;
  render?: (row: {}) => string | React.ReactNode;
  type?: string;
  options?: { value: string; label?: string }[];
}

const DynamicTable = ({ columns, data, onPageChange }: TableProps) => {
  const { i18n } = useTranslation();

  const [pageSize, setPageSize] = useState(10);

  const calculatePageCount = () =>
    Math.floor(data.length / pageSize) + (data.length % pageSize > 0 ? 1 : 0);

  const [pagesCount, setPagesCount] = useState(calculatePageCount());
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPagesCount(calculatePageCount());
  }, [data]);

  const dataRender = ({ row, render, data, type, options }: Props) => {
    switch (type) {
      case "date":
        return moment(data).locale(i18n.language).format(viewDateFormat);
      case "phoneNumber":
        return <span dir="ltr"> {"+966" + data}</span>;
      case "select":
        const option = options?.find(({ value }) => value === data);
        return option?.label || option?.value;
      case "custom":
        return render ? render(row) : data;
      default:
        return data;
    }
  };

  const onPageNumberChange = (i = 0) => {
    onPageChange(i, pageSize);
    setPageNumber(i);
  };

  const onPageSizeChange = (i = 0) => {
    onPageChange(1, i);
    setPageNumber(1);
    setPageSize(i);
  };

  return (
    <table className="table mt-4 w-100">
      <thead className="table-light">
        <tr>
          <th className="py-3" scope="col">
            #
          </th>

          {columns.map(({ label }, i) => (
            <th className="py-3 fw-bold" scope="col" key={i}>
              {label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data
          .filter(
            (_, i) =>
              i >= pageSize * (pageNumber - 1) && i < pageSize * pageNumber
          )
          .map((row, i) => (
            <tr key={i}>
              <td className="py-3" scope="row">
                {i + pageSize * (pageNumber - 1) + 1}
              </td>

              {columns.map(({ name, type, options, render }, y) => (
                <td className="py-3" key={y}>
                  {dataRender({
                    row,
                    data: (row as any)[name],
                    type,
                    render,
                    options,
                  })}
                </td>
              ))}
            </tr>
          ))}
      </tbody>

      <tfoot>
        <tr>
          <th colSpan={columns.length + 1}>
            <div className="d-flex">
              <nav className="my-auto">
                <ul className="pagination">
                  <li className="page-item my-auto">
                    <button
                      className="page-link"
                      onClick={() => onPageNumberChange(pageNumber - 1)}
                      disabled={pageNumber === 1}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </li>

                  {Array(pagesCount)
                    .fill("")
                    .map((_, i) => (
                      <li className="page-item my-auto" key={i}>
                        <button
                          className={`page-link ${
                            pageNumber === i + 1 ? "active" : ""
                          }`}
                          onClick={() => onPageNumberChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                  <li className="page-item my-auto">
                    <button
                      className="page-link"
                      onClick={() => onPageNumberChange(pageNumber + 1)}
                      disabled={pageNumber === pagesCount}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  </li>
                </ul>
              </nav>

              <nav className="my-auto">
                <ul className="pagination">
                  <li className="page-item my-auto">
                    <span className="page-link border-0 d-flex">
                      <div className="my-auto">الصفحة رقم</div>

                      <input
                        value={pageNumber}
                        className="form-control ms-1"
                        style={{ width: "50px" }}
                        type="number"
                        min={1}
                        max={pagesCount}
                        onChange={(e) =>
                          onPageNumberChange(parseInt(e.target.value))
                        }
                      />
                    </span>
                  </li>

                  <li className="page-item my-auto">
                    <span className="page-link border-0 d-flex">
                      <div className="my-auto">حجم الصفحة</div>

                      <select
                        value={pageSize}
                        className="form-control ms-1"
                        onChange={(e) =>
                          onPageSizeChange(parseInt(e.target.value))
                        }
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
};

export default DynamicTable;
