import { FormEvent, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../../store/hooks";
import { addNotification } from "../../../../store/actions/notifications";
import * as AuthApi from "../../../../api/auth";
import DefaultInput from "../../../../components/form/inputs/default";
import Button from "../../../../components/core/button";
import { apiCatchGlobalHandler } from "../../../../utils/function";

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

  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [form, setForm] = useState<ProfileFormState>({
    fullName: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: (user as any)?.phone || "",
    company: (user as any)?.company || "",
    jobTitle: (user as any)?.jobTitle || "",
    country: (user as any)?.country || "",
    language: (user as any)?.language || "en",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      // TODO: plug in your real update endpoint
      // Example: AuthApi.updateMyProfile(form)
      await AuthApi.login(form as any);

      dispatch(
        addNotification({
          msg: t("Global.Form.SuccessMsg", {
            action: t("Global.Form.Labels.Update"),
            data: t("Auth.Settings.User.Account.Title", {
              defaultValue: "Account details",
            }),
          }),
        })
      );

      // Optional: refetch user to sync Redux
      // dispatch(fetchMe())
    } catch (err) {
      apiCatchGlobalHandler(err as any);
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl =
    (user as any)?.avatar ||
    (user as any)?.image ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user?.name || user?.email || "User");

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-4">
        {/* Avatar section (left) */}
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

        {/* Form fields (right) */}
        <div className="col-12 col-md-8">
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="fullName">
                {t("Auth.Settings.User.Account.FullName", {
                  defaultValue: "Full Name",
                })}
              </label>
              <DefaultInput
                id="fullName"
                name="fullName"
                type="text"
                className="form-control"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="username">
                {t("Auth.Settings.User.Account.Username", {
                  defaultValue: "Username",
                })}
              </label>
              <DefaultInput
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="email">
                {t("Auth.Settings.User.Account.Email", {
                  defaultValue: "Email",
                })}
              </label>
              <DefaultInput
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="phone">
                {t("Auth.Settings.User.Account.Phone", {
                  defaultValue: "Phone",
                })}
              </label>
              <DefaultInput
                id="phone"
                name="phone"
                type="text"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="company">
                {t("Auth.Settings.User.Account.Company", {
                  defaultValue: "Company",
                })}
              </label>
              <DefaultInput
                id="company"
                name="company"
                type="text"
                className="form-control"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="jobTitle">
                {t("Auth.Settings.User.Account.JobTitle", {
                  defaultValue: "Job title",
                })}
              </label>
              <DefaultInput
                id="jobTitle"
                name="jobTitle"
                type="text"
                className="form-control"
                value={form.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="country">
                {t("Auth.Settings.User.Account.Country", {
                  defaultValue: "Country",
                })}
              </label>
              <select
                id="country"
                name="country"
                className="form-select"
                value={form.country}
                onChange={handleChange}
              >
                <option value="">
                  {t("Global.Form.Placeholders.Select", {
                    defaultValue: "Select…",
                  })}
                </option>
                <option value="jo">Jordan</option>
                <option value="sa">Saudi Arabia</option>
                <option value="ae">UAE</option>
                <option value="eg">Egypt</option>
                {/* add as needed */}
              </select>
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="language">
                {t("Auth.Settings.User.Account.Language", {
                  defaultValue: "Language",
                })}
              </label>
              <select
                id="language"
                name="language"
                className="form-select"
                value={form.language}
                onChange={handleChange}
              >
                <option value="en">
                  {t("Global.Language.En", { defaultValue: "English" })}
                </option>
                <option value="ar">
                  {t("Global.Language.Ar", { defaultValue: "Arabic" })}
                </option>
              </select>
            </div>

            {/* Save / cancel */}
            <div className="col-12 mt-3">
              <Button
                type="submit"
                className="btn btn-primary me-2"
                disabled={saving}
              >
                {saving
                  ? t("Global.Form.Labels.Saving", {
                      defaultValue: "Saving…",
                    })
                  : t("Global.Form.Labels.Save")}
              </Button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setForm({
                    fullName: user?.name || "",
                    username: user?.username || "",
                    email: user?.email || "",
                    phone: (user as any)?.phone || "",
                    company: (user as any)?.company || "",
                    jobTitle: (user as any)?.jobTitle || "",
                    country: (user as any)?.country || "",
                    language: (user as any)?.language || "en",
                  })
                }
              >
                {t("Global.Form.Labels.Cancel", {
                  defaultValue: "Cancel",
                })}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountProfileTab;
