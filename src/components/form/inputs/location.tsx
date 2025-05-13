import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";
import { useField } from "formik";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const LocationInput: React.FC<FinalInput> = ({ name, ...input }) => {
  const { t } = useTranslation();
  const [field, , helpers] = useField(name);

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    link: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const link = `https://www.google.com/maps?q=${
          coords.lat.toFixed(5) + "," + coords.lng.toFixed(5)
        }`;

        setLocation({
          ...coords,
          link,
        });
        helpers.setValue(link);

        setError(null);
      },
      () => {
        setError("لم نتمكن من تحديد موقعك. الرجاء السماح بالوصول.");
      }
    );
  };

  return (
    <Fragment>
      <input
        {...input}
        type="url"
        placeholder={input.placeholder || t("Global.Labels.Location")}
        className={`form-control form-control-sm ${commonInputClasses}`}
      />

      <span
        className="input-group-text bg-white rounded-2 px-3 py-2 ms-2 me-0"
        role="button"
        onClick={handleGetLocation}
      >
        <FontAwesomeIcon icon={faLocationPin} />
      </span>

      {location?.lng && (
        <div
          className={`d-block w-100 mt-1 small ${
            location ? "text-muted" : "text-white"
          }`}
        >
          <a
            href={location.link}
            target="_blank"
            rel="noreferrer"
            className="d-block mt-2 text-success small"
          >
            استعرض الموقع
          </a>
        </div>
      )}

      <div className="mb-3 text-end" dir="rtl">
        {error && <div className="mt-2 text-danger small">{error}</div>}
      </div>
    </Fragment>
  );
};

export default LocationInput;
