import { useTranslation } from "react-i18next";

import {
  faLocationCrosshairs,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCards from "../../../components/card/statisticCards";
import PageTemplate from "../../../layouts/auth/pageTemplate";
import UsersCard from "../../../components/card/usersCard";
import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";

const DashboardSupervisorView = () => {
  const { t } = useTranslation();

  const statistics = [
    {
      label: "عدد المستفيدين",
      count: 50,
      details: [
        { label: "المنتسبين الجدد", count: 20 },
        { label: "تم قبولهم", count: 200 },
      ],
      color: "success",
      icon: faUsers,
    },
    {
      label: "عدد المستفيدين",
      count: 50,
      details: [
        { label: "المنتسبين الجدد", count: 20 },
        { label: "تم قبولهم", count: 200 },
      ],
      color: "primary",
      icon: faLocationCrosshairs,
    },
    {
      label: "عدد المستفيدين",
      count: 50,
      details: [
        { label: "المنتسبين الجدد", count: 20 },
        { label: "تم قبولهم", count: 200 },
      ],
      color: "info",
      icon: faLocationCrosshairs,
    },
    {
      label: "عدد المستفيدين",
      count: 50,
      details: [
        { label: "المنتسبين الجدد", count: 20 },
        { label: "تم قبولهم", count: 200 },
      ],
      color: "warning",
      icon: faLocationCrosshairs,
    },
  ];

  const researchers = [
    {
      name: "ناصر الدوسري",
      photo: profilePhotoPlaceholder,
      beneficiariesCount: 51,
      visitsCount: 1,
      aidsCount: 34,
      reportsCount: 5,
    },
    {
      name: "ناصر الدوسري",
      photo: profilePhotoPlaceholder,
      beneficiariesCount: 51,
      visitsCount: 11,
      aidsCount: 44,
      reportsCount: 12,
    },
  ];

  return (
    <PageTemplate title="نظرة عامة">
      <DashboardCards statistics={statistics} />

      <UsersCard label="الباحثين" researchers={researchers} />
    </PageTemplate>
  );
};

export default DashboardSupervisorView;
