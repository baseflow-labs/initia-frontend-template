import {
  faCouch,
  faDesktop,
  faDoorOpen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as VisitReportsApi from "../../../api/visits/reports";
import Button from "../../../components/core/button";
import { LabelView } from "../../../components/form";
import DefaultInput from "../../../components/form/inputs/default";
import RadioInput from "../../../components/form/inputs/radio";
import SelectInput from "../../../components/form/inputs/select";
import TextareaInput from "../../../components/form/inputs/textarea";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";

const getInitialContent = () => ({
  content: "",
  type: "",
  photo: null,
  status: "",
  evaluation: 0,
  recommendation: "",
  note: "",
});

const VisitReportsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user } = useAppSelector((state) => state.auth);

  const [data, setData] = useState({
    note: "",
    rooms: [
      {
        type: "",
        recommendation: "",
        note: "",
        contents: [getInitialContent()],
      },
    ],
  });

  const [roomDetails, setRoomDetails] = useState({
    type: "",
    contents: [getInitialContent()],
    recommendation: "",
    note: "",
    index: -1,
  });

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

  const roomContentStatuses = [
    { value: "Working", label: t("Auth.Visits.Report.Working") },
    { value: "Not Working", label: t("Auth.Visits.Report.NotWorking") },
    {
      value: "Needs Maintenance",
      label: t("Auth.Visits.Report.NeedsMaintenance"),
    },
  ];

  const onFormSubmit = () => {
    VisitReportsApi.createOrUpdate({
      ...data,
      visitSchedule: searchParams.get("id"),
      staff: user.id,
    })
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Visits.Report.AddReport"),
              data: t("Auth.Beneficiaries.Profile.Title"),
            }),
          })
        );

        navigate("/visitSchedule/");
      })
      .catch(apiCatchGlobalHandler);
  };

  const updateContentAtIndex = (index = 0, updated = {}) => {
    setRoomDetails((current) => ({
      ...current,
      contents: current.contents.map((content, i) =>
        i === index ? { ...content, ...updated } : content
      ),
    }));
  };

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3>
        {roomDetails.index >= 0
          ? t("Auth.Visits.Report.RoomXDetails", {
              number: roomDetails.index + 1,
            }) +
            ": " +
            renderDataFromOptions(roomDetails.type, roomTypes)
          : "اسم المستفيد"}
      </h3>

      {roomDetails.index >= 0 ? (
        <Fragment>
          <div className="row">
            <div className="col-md-10">
              <Button
                className="w-100 btn-lg my-3 mt-5"
                onClick={() =>
                  setRoomDetails((current) => ({
                    ...current,
                    contents: [...current.contents, getInitialContent()],
                  }))
                }
              >
                {t("Auth.Visits.Report.AddContent")}{" "}
                <FontAwesomeIcon icon={faDesktop} />{" "}
                <FontAwesomeIcon icon={faCouch} />
              </Button>
            </div>

            <div className="col-md-2 pt-3 px-0">
              <LabelView
                name="roomsCount"
                label={t("Auth.Visits.Report.ContentsCount")}
              />

              <DefaultInput
                sizing="lg"
                name="roomsCount"
                value={roomDetails.contents.length}
                disabled
                className="mb-4 w-100 mx-0"
              />
            </div>
          </div>

          {roomDetails.contents.map((content, i) => (
            <div className="my-4 row" key={i}>
              <div className="col-md-10">
                <LabelView
                  name={`type-${i}`}
                  label={t("Auth.Visits.Report.ContentXType", {
                    number: i + 1,
                  })}
                />
                <SelectInput
                  sizing="lg"
                  name={`type-${i}`}
                  value={content.type}
                  options={contentTypes}
                  onChange={(e) =>
                    updateContentAtIndex(i, { type: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2 pt-4">
                <Button
                  color="white"
                  className="btn-lg border-dark w-100"
                  onClick={() =>
                    setRoomDetails((current) => ({
                      ...current,
                      contents: current.contents.filter((_, y) => y !== i),
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faTrash} className="text-danger" />
                </Button>
              </div>
              <div className="col-md-12 pt-3">
                <LabelView
                  name={`content-${i}`}
                  label={t("Auth.Visits.Report.ContentType", {
                    type:
                      content.type === "Device"
                        ? t("Auth.Visits.Report.TheDevice")
                        : t("Auth.Visits.Report.TheFurniture"),
                  })}
                />
                <SelectInput
                  sizing="lg"
                  name={`content-${i}`}
                  value={content.content}
                  options={
                    contentTypes.find(({ value }) => value === content.type)
                      ?.subList || []
                  }
                  onChange={(e) =>
                    updateContentAtIndex(i, { content: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12 pt-3">
                <LabelView
                  name={`photo-${i}`}
                  label={t("Auth.Visits.Report.RoomContentPhoto", {
                    type:
                      content.type === "Device"
                        ? t("Auth.Visits.Report.TheDevice")
                        : t("Auth.Visits.Report.TheFurniture"),
                  })}
                />
                <DefaultInput
                  name={`photo-${i}`}
                  type="file"
                  onChange={(e) =>
                    updateContentAtIndex(i, { photo: e.target.files?.[0] })
                  }
                  className="mb-4"
                />
              </div>
              <div className="col-md-12 pt-3">
                <LabelView
                  name={`status-${i}`}
                  label={t("Auth.Visits.Report.RoomContentStatus", {
                    type:
                      content.type === "Device"
                        ? t("Auth.Visits.Report.TheDevice")
                        : t("Auth.Visits.Report.TheFurniture"),
                  })}
                />

                <RadioInput
                  name={`status-${i}`}
                  options={roomContentStatuses}
                  value={content.status}
                  onChange={(e) =>
                    updateContentAtIndex(i, { status: e.target.value })
                  }
                  className="mb-4"
                />
              </div>

              <div className="col-md-12 pt-3">
                <LabelView
                  name={`evaluation-${i}`}
                  label={t("Auth.Visits.Report.RoomContentEvaluation", {
                    type:
                      content.type === "Device"
                        ? t("Auth.Visits.Report.TheDevice")
                        : t("Auth.Visits.Report.TheFurniture"),
                  })}
                />

                <RadioInput
                  name={`evaluation-${i}`}
                  options={[0, 1, 2, 3, 4, 5].map((value) => ({ value }))}
                  value={content.evaluation}
                  onChange={(e) =>
                    updateContentAtIndex(i, {
                      evaluation: parseInt(e.target.value),
                    })
                  }
                  className="mb-4"
                />
              </div>
            </div>
          ))}

          <div className="col-md-12 pt-3">
            <LabelView
              name="recommendation"
              label={t("Auth.Visits.Report.RoomRecommendations")}
            />

            <TextareaInput
              name="recommendation"
              value={roomDetails.recommendation}
              onChange={(e) =>
                setRoomDetails((current) => ({
                  ...current,
                  recommendation: e.target.value,
                }))
              }
              className="mb-4"
            />
          </div>

          <div className="col-md-12 pt-3">
            <LabelView name="note" label={t("Global.Form.Labels.Notes")} />

            <TextareaInput
              name="note"
              value={roomDetails.note}
              onChange={(e) =>
                setRoomDetails((current) => ({
                  ...current,
                  note: e.target.value,
                }))
              }
              className="mb-4"
            />
          </div>

          <Button
            className="mt-4 w-100 btn-lg"
            onClick={() => {
              const record = { ...roomDetails };
              setRoomDetails({
                type: "",
                contents: [getInitialContent()],
                recommendation: "",
                note: "",
                index: -1,
              });
              setData((current) => ({
                ...current,
                rooms: current.rooms.map((room, i) =>
                  i === record.index ? record : room
                ),
              }));
            }}
          >
            {t("Global.Form.Labels.Save")}
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-md-10">
              <Button
                className="w-100 btn-lg my-3 mt-5"
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    rooms: [
                      ...current.rooms,
                      {
                        type: "",
                        contents: [],
                        recommendation: "",
                        note: "",
                      },
                    ],
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
                  options={roomTypes}
                  onChange={(e) =>
                    setData((current) => ({
                      ...current,
                      rooms: current.rooms.map((room, y) =>
                        y === i
                          ? {
                              ...room,
                              type: e.target.value,
                            }
                          : room
                      ),
                    }))
                  }
                />
              </div>

              <div className="col-md-5">
                <LabelView
                  name="room"
                  label={t("Auth.Visits.Report.Contents")}
                />

                <div>
                  <Button
                    color="success"
                    className="btn-lg w-100 text-white"
                    onClick={() => setRoomDetails({ ...room, index: i })}
                  >
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

          <Button className="mt-4 w-100 btn-lg" onClick={() => onFormSubmit()}>
            {t("Global.Form.Labels.Submit")}
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default VisitReportsView;
