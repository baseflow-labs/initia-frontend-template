import { FormEvent, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../../../store/hooks";
import { addNotification } from "../../../../../store/actions/notifications";
import * as AuthApi from "../../../../../api/auth";
import DefaultInput from "../../../../../components/form/inputs/default";
import Button from "../../../../../components/core/button";
import { apiCatchGlobalHandler } from "../../../../../utils/function";
import Form from "../../../../../components/form";
import { inputs } from "./consts";

interface ProfileFormState {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  country: string;
  language: string;
}

const AccountProfileTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAvatarUploading(true);
      // TODO: Replace with your actual avatar upload endpoint
      // e.g., AuthApi.updateMyAvatar(file)
      await AuthApi.login(file as any); // if not existing, implement later

      dispatch(
        addNotification({
          msg: t("Global.Form.SuccessMsg", {
            action: t("Global.Form.Labels.Update"),
            data: t("Auth.Settings.User.Account.Avatar", {
              defaultValue: "Profile picture",
            }),
          }),
        })
      );

      // You might want to refetch user or update Redux user here
      // e.g., dispatch(fetchMe())
    } catch (err) {
      apiCatchGlobalHandler(err as any);
    } finally {
      setAvatarUploading(false);
      e.target.value = ""; // reset file input
    }
  };

  const avatarUrl =
    (user as any)?.avatar ||
    (user as any)?.image ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user?.name || user?.email || "User");

  return (
    <div className="row">
      <div className="col-12 col-md-4 d-flex flex-column align-items-center">
        <div className="mb-3">
          <img
            src={avatarUrl}
            alt="user-avatar"
            className="d-block rounded"
            style={{ width: 120, height: 120, objectFit: "cover" }}
          />
        </div>

        <div className="d-flex flex-column gap-2">
          <div>
            <label className="btn btn-sm btn-primary mb-0 w-100" htmlFor="avatar">
              {avatarUploading
                ? t("Global.Loading", { defaultValue: "Uploading..." })
                : t("Auth.Settings.User.Account.ChangeAvatar", {
                    defaultValue: "Upload new photo",
                  })}
            </label>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleAvatarChange}
              disabled={avatarUploading}
            />
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              // Optional: implement reset avatar to default
            }}
          >
            {t("Auth.Settings.User.Account.ResetAvatar", {
              defaultValue: "Reset to default",
            })}
          </button>

          <p className="text-muted small mb-0">
            {t("Auth.Settings.User.Account.AvatarHint", {
              defaultValue: "Allowed JPG, PNG. Max size 2MB.",
            })}
          </p>
        </div>
      </div>

      <div className="col-12 col-md-8">
        <Form inputs={() => inputs(t)} />
      </div>
    </div>
  );
};

export default AccountProfileTab;
