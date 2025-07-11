import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import * as XLSX from "xlsx";

import * as VisitApi from "../../../api/visits/visits";
import Button from "../../../components/core/button";
import DynamicTable from "../../../components/table";
import {
  getRoomContentStatuses,
  getRoomContentTypes,
  getRoomTypes,
} from "../../../utils/dataOptions";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";

type visitReportRoomContentsType = {
  id: string;
  updatedAt: string;
  createdAt: string;
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
        setVisit(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const contentTypes = getRoomContentTypes(t);

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

  const roomContentStatuses = getRoomContentStatuses(t);

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

  const roomTypes = getRoomTypes(t);

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    visit?.visitReportRooms.forEach((room, i) => {
      const {
        id,
        updatedAt,
        createdAt,
        visitReportRoomContents,
        ...finalRoom
      } = room;
      const worksheet1 = XLSX.utils.json_to_sheet([finalRoom]);

      XLSX.utils.book_append_sheet(workbook, worksheet1, "Room " + (i + 1));

      const worksheet2 = XLSX.utils.json_to_sheet(
        visitReportRoomContents.map(
          ({
            id,
            updatedAt,
            createdAt,
            // photo,
            ...rest
          }) => rest
        )
      );

      XLSX.utils.book_append_sheet(workbook, worksheet2, "Contents " + (i + 1));
    });

    XLSX.writeFile(workbook, "Visit Report" + ".xlsx");
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-9">
          <h2>{t("Auth.Visits.Report.Title")}</h2>
        </div>

        <div className="col-md-3">
          <Button
            outline
            color="success"
            className="float-end"
            onClick={() => exportToExcel()}
          >
            <FontAwesomeIcon icon={faFileExcel} />
          </Button>
        </div>
      </div>

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
            fitHeight
          />

          <DynamicTable
            columns={columnsFer}
            data={room.visitReportRoomContents.filter(
              ({ type }) => type === "Furniture"
            )}
            onPageChange={() => {}}
            noPagination
            fitHeight
          />
        </div>
      ))}
    </Fragment>
  );
};

export default VisitDetailView;
