import { useField } from "formik";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import { locationIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const LocationInput: React.FC<FinalInput> = ({ name, ...input }) => {
  const { t, i18n } = useTranslation();
  const [, , helpers] = useField(name);

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    link: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError(t("Global.Form.Labels.BrowserDontSupportLocation"));
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
        setError(t("Global.Form.Labels.PleaseAllowLocation"));
      }
    );
  };

  return (
    <Fragment>
      <input
        {...input}
        type="url"
        placeholder={input.placeholder || t("Global.Form.Labels.Location")}
        className={`form-control form-control-sm ${commonInputClasses}`}
      />

      <span
        className="input-group-text bg-white rounded-2 px-3 py-2 ms-2 me-0"
        role="button"
        onClick={handleGetLocation}
      >
        <IconWrapperComp icon={locationIcon} />
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
            {t("Global.Form.Labels.ViewLocation")}
          </a>
        </div>
      )}

      <div className="mb-3 text-end" dir={i18n.dir()}>
        {error && <div className="mt-2 text-danger small">{error}</div>}
      </div>
    </Fragment>
  );
};

export default LocationInput;
