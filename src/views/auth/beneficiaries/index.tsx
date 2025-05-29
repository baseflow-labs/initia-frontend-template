import { useTranslation } from "react-i18next";
import TablePage from "../../../components/tablePage";

const BeneficiariesView = () => {
  const { t } = useTranslation();

  const title = t("Auth.Beneficiaries.Title");

  const filters = [
    {
      label: "حالة الطلب",
      options: [{ value: "مكتمل" }, { value: "مستفيد جديد" }],
      multi: false,
    },
    { label: "الجنسية", options: [{ value: "سعودي" }] },
  ];

  const actionButtons = [{ label: t("Auth.Beneficiaries.AddBeneficiary") }];

  const columns = [
    { label: "First", name: "first", type: "text" },
    { label: "Last", name: "last", type: "text" },
    { label: "Date", name: "date", type: "date" },
    { label: "Status", name: "status", type: "status" },
    { label: "Phone Number", name: "phoneNumber", type: "phoneNo" },
  ];

  const data = [
    {
      first: "Ahmad",
      last: "Abdulla",
      date: "2022-05-05",
      phoneNumber: "788424973",
    },
    {
      first: "Yusef",
      last: "Ali",
      date: "2021-05-05",
      phoneNumber: "788424970",
      status: "Accept",
    },
  ];

  return (
    <TablePage
      title={title}
      filters={filters}
      actionButtons={actionButtons}
      columns={columns}
      data={data}
      onSearch={(values) => console.log(values)}
    />
  );
};

export default BeneficiariesView;
