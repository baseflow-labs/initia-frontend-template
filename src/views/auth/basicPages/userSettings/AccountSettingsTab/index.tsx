import Form from "@/components/form";
import { addNotification } from "@/store/actions/notifications";
import { useAppSelector } from "@/store/hooks";
import { apiCatchGlobalHandler } from "@/utils/function";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { inputs } from "./consts";

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
    } catch (err: unknown) {
      apiCatchGlobalHandler(err);
    } finally {
      setAvatarUploading(false);
      e.target.value = ""; // reset file input
    }
  };

  const avatarUrl =
    user?.avatar ||
    user?.image ||
    "https://firebasestorage.googleapis.com/v0/b/initia-platform.firebasestorage.app/o/logo.png?alt=media&token=88589714-a0a4-434f-b357-a6a317dffa3e";

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
