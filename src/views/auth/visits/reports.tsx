import {
  faCircle,
  faDesktop,
  faDoorOpen,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import * as VisitApi from "../../../api/visits/visits";
import Form, { LabelView } from "../../../components/form";
import Modal from "../../../components/modal";
import TablePage from "../../../layouts/auth/tablePage";
import { addNotification } from "../../../store/actions/notifications";
import { viewDayDateFormat } from "../../../utils/consts";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
  statusColorRender,
} from "../../../utils/function";
import Button from "../../../components/core/button";
import DefaultInput from "../../../components/form/inputs/default";
import TextareaInput from "../../../components/form/inputs/textarea";
import SelectInput from "../../../components/form/inputs/select";

const VisitReportsView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    note: "",
    rooms: [
      {
        type: "",
      },
    ],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [crudData, setCrudData] = useState({});
  const [selectOptions, setSelectOptions] = useState({
    beneficiaries: [{ id: "", fullName: "" }],
  });
  const [visits, setVisits] = useState([{}]);

  const getData = () => {
    VisitApi.getAll()
      .then((res) => {
        setVisits(
          (res as any).map(
            ({
              beneficiary = {
                contactsBank: {},
                housing: {},
                user: { username: "" },
              },
              ...rest
            }) => ({
              beneficiaryMobile: beneficiary.user.username,
              ...beneficiary.housing,
              ...beneficiary.contactsBank,
              ...beneficiary,
              ...rest,
            })
          ) as any
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();

    BeneficiaryApi.getAll()
      .then((res) =>
        setSelectOptions((current) => ({
          ...current,
          beneficiaries: res as any,
        }))
      )
      .catch(apiCatchGlobalHandler);
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setOpenModal(true);
    }
  }, [searchParams.get("id")]);

  const title = t("Auth.Visits.Title");

  const statuses = [
    {
      value: "Pending",
      label: t("Auth.Visits.Statuses.Pending"),
    },
    {
      value: "Done",
      label: t("Auth.Visits.Statuses.Done"),
    },
    {
      value: "Cancelled",
      label: t("Auth.Visits.Statuses.Cancelled"),
    },
  ];

  const filters = [
    {
      label: t("Auth.Visits.Statuses.Status"),
      options: statuses,
    },
  ];

  const columns = [
    {
      type: "text",
      name: "fullName",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
    },
    {
      type: "date",
      name: "date",
      timestampFormat: viewDayDateFormat,
      label: t("Auth.Visits.VisitDate"),
    },
    {
      type: "time",
      name: "time",
      label: t("Auth.Visits.VisitTime"),
    },
    {
      type: "phoneNumber",
      name: "beneficiaryMobile",
      label: t("Global.Labels.PhoneNumber"),
    },
    {
      type: "custom",
      name: "city",
      label: t("Auth.MembershipRegistration.Address"),
      render: (row: any) => row.city + " - " + row.district,
    },
    {
      type: "custom",
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${statusColorRender(row.status)}`}
          />{" "}
          {renderDataFromOptions(row.status, statuses)}
        </Fragment>
      ),
      name: "status",
      label: t("Auth.Visits.Statuses.Status"),
    },
  ];

  const actionButtons = [
    {
      label: t("Auth.Visits.Report.AddReport"),
      route: "/visits/report",
      outline: true,
    },
    {
      label: t("Auth.Visits.AddVisit"),
      onClick: () => setOpenModal(true),
    },
  ];

  const scheduleVisitInputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      })),
      defaultValue: searchParams.get("id") || "",
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
    {
      type: "time",
      name: "time",
      required: true,
    },
    {
      type: "date",
      name: "date",
      required: true,
    },
    {
      type: "textarea",
      name: "reason",
      label: t("Auth.Visits.VisitPurpose"),
      required: true,
    },
  ];

  const onModalClose = () => {
    setOpenModal(false);
    setCrudData({});
    if (searchParams.get("id")) {
      navigate("/visits");
      window.location.reload();
    }
  };

  const cancelVisit = (data: string | object) => {
    VisitApi.cancel(typeof data === "string" ? data : "")
      .then((res) => {
        getData();
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.CancelVisit"),
              data: selectOptions.beneficiaries.find(({ id }) => id === data)
                ?.fullName,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const onCrudSuccess = (e: { beneficiary: "" }, action = "") => {
    onModalClose();
    getData();
    dispatch(
      addNotification({
        msg: t("Global.Form.SuccessMsg", {
          action,
          data: selectOptions.beneficiaries.find(
            ({ id }) => id === e.beneficiary
          )?.fullName,
        }),
      })
    );
  };

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3>اسم المستفيد</h3>

      <div className="row">
        <div className="col-md-10">
          <Button
            className="w-100 btn-lg my-3 mt-5"
            onClick={() =>
              setData((current) => ({
                ...current,
                rooms: [...current.rooms, { type: "" }],
              }))
            }
          >
            {t("Auth.Visits.Report.AddRoom")}{" "}
            <FontAwesomeIcon icon={faDoorOpen} />
          </Button>
        </div>

        <div className="col-md-2 pt-3 px-0">
          <LabelView
            name="roomsCount"
            label={t("Auth.Visits.Report.RoomsCount")}
          />

          <DefaultInput
            sizing="lg"
            name="roomsCount"
            value={data.rooms.length}
            disabled
            className="mb-4 w-100 mx-0"
            min={1}
          />
        </div>
      </div>

      {data.rooms.map((room, i) => (
        <div className="my-4 row" key={i}>
          <div className="col-md-6">
            <LabelView
              name="room"
              label={t("Auth.Visits.Report.RoomXType", { number: i + 1 })}
            />

            <SelectInput
              sizing="lg"
              name="type"
              value={room.type}
              options={[{ value: "1" }, { value: "2" }]}
              onChange={(e) =>
                setData((current) => ({
                  ...current,
                  rooms: current.rooms.map((_, y) =>
                    y === i ? { type: e.target.value } : _
                  ),
                }))
              }
            />
          </div>

          <div className="col-md-5">
            <LabelView name="room" label={t("Auth.Visits.Report.Contents")} />

            <div>
              <Button color="success" className="btn-lg w-100 text-white">
                {t("Auth.Visits.Report.RoomXDetails", { number: i + 1 })}{" "}
                <FontAwesomeIcon icon={faDesktop} />
              </Button>
            </div>
          </div>

          <div className="col-md-1 pt-4">
            <div className="mt-2">
              <Button
                color="white"
                className="btn-lg border-dark"
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    rooms: current.rooms.filter((_, y) => !(y === i)),
                  }))
                }
              >
                <FontAwesomeIcon icon={faTrash} className="text-danger" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <LabelView name="roomsCount" label={t("Global.Form.Labels.Notes")} />

      <TextareaInput
        name="note"
        value={data.note}
        onChange={(e) =>
          setData((current) => ({
            ...current,
            note: e.target.value,
          }))
        }
        className="mb-4"
      />

      <Button className="mt-4 w-100 btn-lg">
        {t("Global.Form.Labels.Submit")}
      </Button>
    </div>
  );
};

export default VisitReportsView;
