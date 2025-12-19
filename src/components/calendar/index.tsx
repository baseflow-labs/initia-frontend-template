import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export interface CalendarEventType {
  id: string;
  label: string;
  /** e.g. "primary", "success", "warning", "danger", "info" */
  icon?: IconProp;
}

export interface CalendarEventParty {
  id: string;
  name: string;
  /** e.g. "primary", "success", "warning", "danger", "info" */
  colorClass?: string;
  department?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  typeId: string;
  /** ISO string or Date */
  start: string | Date;
  /** ISO string or Date (optional, defaults to start) */
  end?: string | Date;
  partyId?: string;
  /** optional extra info shown in tooltip or small text */
  description?: string;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  eventTypes: CalendarEventType[];
  parties: CalendarEventParty[];
  /** initial month to show (defaults to today) */
  initialDate?: string | Date;
  /** optional handler when user clicks an event */
  onEventClick?: (event: CalendarEvent) => void;
}

/**
 * Bootstrap-styled month calendar with:
 * - Event type filters
 * - Party filters
 * - Hour-based & multi-day events
 */
const CalendarComp: React.FC<CalendarViewProps> = ({
  events,
  eventTypes,
  parties,
  initialDate,
  onEventClick,
}) => {
  const { t } = useTranslation();

  const [currentMonth, setCurrentMonth] = useState<Moment>(
    initialDate ? moment(initialDate) : moment()
  );

  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>(
    () => eventTypes.map((t) => t.id) // all types selected by default
  );

  const [selectedPartyIds, setSelectedPartyIds] = useState<string[]>(
    () => parties.map((p) => p.id) // all parties selected by default
  );

  const startOfMonth = useMemo(() => currentMonth.clone().startOf("month"), [currentMonth]);
  const endOfMonth = useMemo(() => currentMonth.clone().endOf("month"), [currentMonth]);

  /**
   * We build the grid from the same startOfGrid/endOfGrid used
   * for both header and body so they are always perfectly aligned.
   */
  const startOfGrid = useMemo(
    () => startOfMonth.clone().startOf("week"), // uses locale week start
    [startOfMonth]
  );
  const endOfGrid = useMemo(() => endOfMonth.clone().endOf("week"), [endOfMonth]);

  const calendarGrid = useMemo(() => {
    const day = startOfGrid.clone();
    const days: Moment[] = [];

    while (day.isSameOrBefore(endOfGrid, "day")) {
      days.push(day.clone());
      day.add(1, "day");
    }

    return days;
  }, [startOfGrid, endOfGrid]);

  // Header = the first 7 days of the grid
  const headerDays = useMemo(() => calendarGrid.slice(0, 7), [calendarGrid]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  const toggleTypeSelection = (typeId: string) => {
    setSelectedTypeIds((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  const togglePartySelection = (partyId: string) => {
    setSelectedPartyIds((prev) =>
      prev.includes(partyId) ? prev.filter((id) => id !== partyId) : [...prev, partyId]
    );
  };

  const getEventsForDate = (day: Moment): CalendarEvent[] => {
    return events.filter((evt) => {
      // Filter by type
      if (!selectedTypeIds.includes(evt.typeId)) return false;

      // Filter by party only if event has a partyId
      if (evt.partyId && !selectedPartyIds.includes(evt.partyId)) return false;

      const start = moment(evt.start);
      const end = evt.end ? moment(evt.end) : start;

      // Event is active on this day if this day is within [start, end]
      return day.isSameOrAfter(start, "day") && day.isSameOrBefore(end, "day");
    });
  };

  const getEventBadgeClass = (event: CalendarEvent, party?: CalendarEventParty): string => {
    const type = eventTypes.find((t) => t.id === event.typeId);
    const color = party?.colorClass || (type ? type.label.toLowerCase() : "secondary");
    return `badge bg-${color} text-truncate d-block mb-1`;
  };

  const formatEventTime = (event: CalendarEvent, day: Moment): string => {
    const start = moment(event.start);
    const end = event.end ? moment(event.end) : start;

    const isSameDayStart = start.isSame(day, "day");
    const isSameDayEnd = end.isSame(day, "day");

    // Multi-day event
    if (!start.isSame(end, "day")) {
      if (isSameDayStart) {
        // first day
        return `${start.format("HH:mm")} - …`;
      } else if (isSameDayEnd) {
        // last day
        return `… - ${end.format("HH:mm")}`;
      } else {
        // middle day
        return "All day";
      }
    }

    // Single-day event with time
    if (start.isSame(end)) {
      return start.format("HH:mm");
    }

    return `${start.format("HH:mm")} – ${end.format("HH:mm")}`;
  };

  const findParty = (partyId?: string) =>
    partyId ? parties.find((p) => p.id === partyId) : undefined;

  return (
    <div className="row">
      {/* Sidebar: filters / legend */}
      <div className="col-md-3 mb-3">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">{t("Global.Calendar.Filters")}</h5>
          </div>
          <div className="card-body">
            <h6 className="text-muted">{t("Global.Calendar.EventTypes")}</h6>
            <ul className="list-unstyled mb-3">
              {eventTypes.map((type) => (
                <li className="mb-1 d-flex align-items-center" key={type.id}>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`type-switch-${type.id}`}
                      checked={selectedTypeIds.includes(type.id)}
                      onChange={() => toggleTypeSelection(type.id)}
                    />

                    <label className="form-check-label ms-1" htmlFor={`type-switch-${type.id}`}>
                      {type.label}
                    </label>
                  </div>

                  {type.icon && <FontAwesomeIcon icon={type.icon} style={{ minWidth: 16 }} />}
                </li>
              ))}
            </ul>

            <h6 className="text-muted">{t("Global.Calendar.Parties")}</h6>
            <ul className="list-unstyled mb-0">
              {parties.map((party) => (
                <li className="mb-1 d-flex align-items-center" key={party.id}>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`party-switch-${party.id}`}
                      checked={selectedPartyIds.includes(party.id)}
                      onChange={() => togglePartySelection(party.id)}
                    />
                    <label className="form-check-label ms-1" htmlFor={`party-switch-${party.id}`}>
                      {party.name}
                      {party.department ? ` | ${party.department}` : ""}
                    </label>
                  </div>

                  {party.colorClass && (
                    <span className={`badge bg-${party.colorClass} ms-2`} style={{ minWidth: 16 }}>
                      &nbsp;
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main calendar */}
      <div className="col-md-9">
        <div className="card">
          {/* Header: month navigation */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={handlePrevMonth}
              >
                &lt;
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleNextMonth}
              >
                &gt;
              </button>
            </div>

            <h5 className="card-title mb-0">{currentMonth.format("MMMM YYYY")}</h5>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setCurrentMonth(moment())}
            >
              {t("Global.Calendar.Today")}
            </button>
          </div>

          {/* Calendar grid */}
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 calendar-table">
                <thead className="table-light">
                  <tr>
                    {headerDays.map((day) => (
                      <th key={day.format("YYYY-MM-DD")} className="text-center py-2">
                        {/* Weekday (e.g. Mon) */}
                        {day.format("ddd")}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: calendarGrid.length / 7 }).map((_, weekIndex) => (
                    <tr key={weekIndex} style={{ height: "120px" }}>
                      {calendarGrid.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => {
                        const inCurrentMonth = day.isSame(currentMonth, "month");
                        const dayEvents = getEventsForDate(day);

                        return (
                          <td
                            key={day.format("YYYY-MM-DD")}
                            className={
                              "align-top p-1 position-relative " +
                              (inCurrentMonth ? "" : "bg-light text-muted")
                            }
                            style={{ verticalAlign: "top" }}
                          >
                            {/* Date number + weekday for debugging / clarity */}
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold small">{day.date()}</span>
                              {/* Optional: show day name inside cell too */}
                              {/* <span className="small text-muted">
                                    {day.format("ddd")}
                                  </span> */}
                            </div>

                            {/* Events */}
                            <div className="mt-1">
                              {dayEvents.length === 0
                                ? null
                                : dayEvents.map((event) => {
                                    const party = findParty(event.partyId);

                                    return (
                                      <div
                                        key={event.id}
                                        className={
                                          getEventBadgeClass(event, party) +
                                          " w-100 d-flex py-3 text-start"
                                        }
                                        title={
                                          event.description ||
                                          `${event.title} (${formatEventTime(event, day)})`
                                        }
                                        onClick={() => onEventClick && onEventClick(event)}
                                      >
                                        {/* Party chip (color-coded) */}
                                        {party && (
                                          <p className="rotate-90 mt-2">
                                            <div>{party.name}</div>
                                          </p>
                                        )}

                                        <div
                                          style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            fontSize: "0.7rem",
                                          }}
                                        >
                                          {/* Time */}
                                          <p>{formatEventTime(event, day)}</p>

                                          {/* Title */}
                                          <h6>
                                            {event.typeId && (
                                              <FontAwesomeIcon
                                                icon={
                                                  eventTypes.find((e) => e.id === event.typeId)
                                                    ?.icon || faCircle
                                                }
                                              />
                                            )}
                                            {event.title}
                                          </h6>
                                        </div>
                                      </div>
                                    );
                                  })}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComp;
