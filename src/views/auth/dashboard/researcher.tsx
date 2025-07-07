import { useTranslation } from "react-i18next";

import {
  faLocationCrosshairs,
  faTable,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCards from "../../../components/card/statisticCards";
import PageTemplate from "../../../layouts/auth/pageTemplate";
import UsersCard from "../../../components/card/usersCard";
import profilePhotoPlaceholder from "../../../assets/images/profile-image-placeholder.png";
import TasksCard from "../../../components/card/tasksCard";

const DashboardResearcherView = () => {
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
      icon: faTable,
      color: "success",
      label: "طلبات انتساب للمراجعة",
      count: 4,
      route: "/beneficiaries",
    },
    {
      icon: faTable,
      color: "success",
      label: "طلبات انتساب للمراجعة",
      count: 4,
      route: "/contact-us",
    },
  ];

  return (
    <PageTemplate title="نظرة عامة">
      <DashboardCards statistics={statistics} />

      <TasksCard label="المهام" tasks={researchers} />
    </PageTemplate>
  );
};

export default DashboardResearcherView;
