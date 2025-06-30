import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import * as VisitApi from "../../../api/visits/visits";
import DynamicTable from "../../../components/table";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";

type visitReportRoomContentsType = {
  id: string;
  type: string;
  content: string;
  photo: string;
  status: string;
  evaluation: number;
};
type visitType = {
  visitReportRooms: {
    id: string;
    updatedAt: string;
    createdAt: string;
    type: string;
    contentsCount: number;
    recommendation: null;
    note: null;
    visitReportRoomContents: visitReportRoomContentsType[];
  }[];
};

const VisitDetailView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [visit, setVisit] = useState<visitType>();

  const getData = () => {
    VisitApi.getReportByVisitId(searchParams.get("id") || "")
      .then((res: any) => {
        setVisit(res);
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const contentTypes = [
    {
      value: "Device",
      label: t("Auth.Visits.Report.Device"),
      subList: [
        { label: t("Auth.Visits.Report.Fridge"), value: "Fridge" },
        { label: t("Auth.Visits.Report.Freezer"), value: "Freezer" },
        { label: t("Auth.Visits.Report.Oven"), value: "Oven" },
        { label: t("Auth.Visits.Report.Microwave"), value: "Microwave" },
        {
          label: t("Auth.Visits.Report.AirConditioner"),
          value: "Air Conditioner",
        },
        {
          label: t("Auth.Visits.Report.WashingMachine"),
          value: "Washing Machine",
        },
        { label: t("Auth.Visits.Report.Dishwasher"), value: "Dishwasher" },
        { label: t("Auth.Visits.Report.WaterHeater"), value: "Water Heater" },
        { label: t("Auth.Visits.Report.TV"), value: "TV" },
        { label: t("Auth.Visits.Report.Router"), value: "Router" },
      ],
    },
    {
      value: "Furniture",
      label: t("Auth.Visits.Report.Furniture"),
      subList: [
        { label: t("Auth.Visits.Report.DiningTable"), value: "Dining Table" },
        { label: t("Auth.Visits.Report.Sofa"), value: "Sofa" },
        { label: t("Auth.Visits.Report.Bed"), value: "Bed" },
        { label: t("Auth.Visits.Report.Wardrobe"), value: "Wardrobe" },
        {
          label: t("Auth.Visits.Report.DressingTable"),
          value: "Dressing Table",
        },
        { label: t("Auth.Visits.Report.Desk"), value: "Desk" },
        { label: t("Auth.Visits.Report.Shelf"), value: "Shelf" },
        { label: t("Auth.Visits.Report.Nightstand"), value: "Nightstand" },
        { label: t("Auth.Visits.Report.PrayerMat"), value: "Prayer Mat" },
        { label: t("Auth.Visits.Report.ShoeRack"), value: "Shoe Rack" },
      ],
    },
  ];

  const contents = contentTypes.reduce(
    (
      final: {
        value: string;
        label?: string;
      }[],
      current
    ) => [...final, ...current.subList],
    []
  );

  const roomContentStatuses = [
    {
      value: "Working",
      label: t("Auth.Visits.Report.Working"),
    },
    {
      value: "Not Working",
      label: t("Auth.Visits.Report.NotWorking"),
    },
    {
      value: "Needs Maintenance",
      label: t("Auth.Visits.Report.NeedsMaintenance"),
    },
  ];

  const columns = [
    {
      type: "select",
      name: "content",
      options: contents,
      label: t("Auth.Visits.Report.TheDevice"),
    },
    {
      type: "select",
      options: roomContentStatuses,
      name: "status",
      label: t("Auth.Visits.Report.RoomContentStatus", {
        type: t("Auth.Visits.Report.TheDevice"),
      }),
    },
    {
      type: "stars",
      name: "evaluation",
      label: t("Auth.Visits.Detail.evaluation"),
    },
    {
      type: "image",
      name: "photo",
      label: t("Auth.Visits.Report.RoomContentPhoto", {
        type: t("Auth.Visits.Report.TheDevice"),
      }),
    },
    {
      type: "custom",
      render: (row = { status: "" }) => (
        <>
          {row.status === "Needs Maintenance"
            ? t("Global.Form.Labels.Yes")
            : t("Global.Form.Labels.No")}
        </>
      ),
      name: "needRepair",
      label: t("Auth.Visits.Detail.needRepair"),
    },
  ];

  const columnsFer = [
    {
      type: "select",
      name: "content",
      options: contents,
      label: t("Auth.Visits.Report.TheFurniture"),
    },
    {
      type: "select",
      options: roomContentStatuses,
      name: "status",
      label: t("Auth.Visits.Report.RoomContentStatus", {
        type: t("Auth.Visits.Report.TheFurniture"),
      }),
    },
    {
      type: "stars",
      name: "evaluation",
      label: t("Auth.Visits.Detail.evaluation"),
    },
    {
      type: "image",
      name: "photo",
      label: t("Auth.Visits.Report.RoomContentPhoto", {
        type: t("Auth.Visits.Report.TheFurniture"),
      }),
    },
    {
      type: "custom",
      render: (row = { status: "" }) => (
        <Fragment>
          {row.status === "Needs Maintenance"
            ? t("Global.Form.Labels.Yes")
            : t("Global.Form.Labels.No")}
        </Fragment>
      ),
      name: "needRepair",
      label: t("Auth.Visits.Detail.needRepair"),
    },
  ];

  const roomItems =
    visit?.visitReportRooms
      ?.map(({ visitReportRoomContents }) => visitReportRoomContents)
      .flat() || [];

  const furnitureNumber =
    roomItems?.filter(({ type }) => type === "Furniture").length || 0;

  const devicesNumber = roomItems?.length - furnitureNumber;

  const tabs = [
    `${t("Auth.Visits.Detail.roomsNumber")}  ${
      visit?.visitReportRooms.length || 0
    }`,
    `${t("Auth.Visits.Detail.devicesNumber")}  ${devicesNumber}`,
    `${t("Auth.Visits.Detail.furnitureNumber")}  ${furnitureNumber}`,
  ];

  const roomTypes = [
    { value: "Entry", label: t("Auth.Visits.Report.Entry") },
    { value: "Living Room", label: t("Auth.Visits.Report.LivingRoom") },
    { value: "Dining Room", label: t("Auth.Visits.Report.DiningRoom") },
    { value: "Bedroom", label: t("Auth.Visits.Report.Bedroom") },
    { value: "Kitchen", label: t("Auth.Visits.Report.Kitchen") },
    { value: "Bathroom", label: t("Auth.Visits.Report.Bathroom") },
    { value: "Maid Room", label: t("Auth.Visits.Report.MaidRoom") },
    { value: "Storage", label: t("Auth.Visits.Report.Storage") },
    { value: "Laundry", label: t("Auth.Visits.Report.Laundry") },
    { value: "Guest Room", label: t("Auth.Visits.Report.GuestRoom") },
    { value: "Prayer Room", label: t("Auth.Visits.Report.PrayerRoom") },
    { value: "Hallway", label: t("Auth.Visits.Report.Hallway") },
    { value: "Balcony", label: t("Auth.Visits.Report.Balcony") },
  ];

  return (
    <Fragment>
      <h2>{"تقرير الزيارة"}</h2>

      <div className="row gap-4 mt-4 w-75">
        {tabs?.map((t) => (
          <div className="px-3 py-3 bg-white rounded-3 border border-1 border-info col-3 align-items-end text-center">
            <span className="text-dark fs-6 fw-normal ">{t}</span>
          </div>
        ))}
      </div>

      {visit?.visitReportRooms?.map((room, i) => (
        <div key={room.id} className="mt-5">
          <h2>
            {i + 1 + "-"} {renderDataFromOptions(room.type, roomTypes)}
          </h2>

          <DynamicTable
            columns={columns}
            data={room?.visitReportRoomContents.filter(
              ({ type }) => type === "Device"
            )}
            onPageChange={() => {}}
            noPagination
          />

          <DynamicTable
            columns={columnsFer}
            data={room.visitReportRoomContents.filter(
              ({ type }) => type === "Furniture"
            )}
            onPageChange={() => {}}
            noPagination
          />
        </div>
      ))}
    </Fragment>
  );
};

export default VisitDetailView;
