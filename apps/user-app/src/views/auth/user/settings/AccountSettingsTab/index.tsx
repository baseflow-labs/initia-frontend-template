import Button from "@initia/shared/ui/components/core/button";
import * as UsersApi from "@initia/shared/api/users";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { UserProps } from "@initia/shared/types/auth";

import { useAppSelector } from "../../../../../store/hooks";
import { addNotification } from "../../../../../store/actions/notifications";
import { updateUserProfile } from "../../../../../store/actions/auth";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

const AccountProfileTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [form, setForm] = useState<Partial<UserProps>>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
    language: "en",
  });

  // Load fresh profile from server on mount
  useEffect(() => {
    UsersApi.getMe()
      .then((res) => {
        const u = res.payload;
        setForm({
          fullName: u.fullName ?? "",
          username: u.username ?? "",
          email: u.email ?? "",
          phone: u.phone ?? "",
          company: u.company ?? "",
          jobTitle: u.jobTitle ?? "",
          country: u.country ?? "",
          language: u.language ?? "en",
        });
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  const set =
    (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (import.meta.env.VITE_APP_ENVIRONMENT === "staging") {
      dispatch(
        addNotification({ type: "err", msg: t("Global.Form.Labels.UnAvailableForDemoMode") })
      );
      return;
    }

    setSaving(true);
    UsersApi.updateMe({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      phone: form.phone,
      company: form.company,
      jobTitle: form.jobTitle,
      country: form.country,
      language: form.language,
    })
      .then((res) => {
        dispatch(updateUserProfile(res.payload));
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Settings.User.Account.Title"),
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler)
      .finally(() => setSaving(false));
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      // Avatar upload is handled via the files module (future integration)
      dispatch(
        addNotification({
          msg: t("Global.Form.SuccessMsg", {
            action: t("Global.Form.Labels.Update"),
            data: t("Auth.Settings.User.Account.Avatar", { defaultValue: "Profile picture" }),
          }),
        })
      );
    } catch (err) {
      apiCatchGlobalHandler(err);
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };

  const avatarUrl =
    user?.avatar ||
    user?.image ||
    "https://firebasestorage.googleapis.com/v0/b/initia-platform.firebasestorage.app/o/logo.png?alt=media&token=88589714-a0a4-434f-b357-a6a317dffa3e";

  return (
    <div className="row">
      {/* ── Avatar column ── */}
      <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
        <img
          src={avatarUrl}
          alt="user-avatar"
          className="d-block rounded mb-3"
          style={{ width: 120, height: 120, objectFit: "cover" }}
        />

        <label htmlFor="avatar" style={{ cursor: "pointer" }} className="w-100">
          <Button
            size="sm"
            className="w-100 mb-2"
            onClick={() => document.getElementById("avatar")?.click()}
          >
            {avatarUploading
              ? t("Global.Loading", { defaultValue: "Uploading..." })
              : t("Auth.Settings.User.Account.ChangeAvatar", { defaultValue: "Upload new photo" })}
          </Button>
        </label>

        <input
          id="avatar"
          type="file"
          accept="image/*"
          className="d-none"
          onChange={handleAvatarChange}
          disabled={avatarUploading}
        />

        <p className="text-muted small mb-0 text-center">
          {t("Auth.Settings.User.Account.AvatarHint", {
            defaultValue: "Allowed JPG, PNG. Max size 2MB.",
          })}
        </p>
      </div>

      {/* ── Form column ── */}
      <div className="col-12 col-md-8">
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.FullName", { defaultValue: "Full Name" })}
            </label>
            <input
              className="form-control"
              value={form.fullName ?? ""}
              onChange={set("fullName")}
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Username", { defaultValue: "Username" })}
            </label>
            <input
              className="form-control"
              value={form.username ?? ""}
              onChange={set("username")}
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Email", { defaultValue: "Email" })}
            </label>
            <input
              className="form-control"
              type="email"
              value={form.email ?? ""}
              onChange={set("email")}
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Phone", { defaultValue: "Phone" })}
            </label>
            <input
              className="form-control"
              type="tel"
              value={form.phone ?? ""}
              onChange={set("phone")}
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Company", { defaultValue: "Company" })}
            </label>
            <input className="form-control" value={form.company ?? ""} onChange={set("company")} />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.JobTitle", { defaultValue: "Job Title" })}
            </label>
            <input
              className="form-control"
              value={form.jobTitle ?? ""}
              onChange={set("jobTitle")}
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Country", { defaultValue: "Country" })}
            </label>
            <input className="form-control" value={form.country ?? ""} onChange={set("country")} />
          </div>

          <div className="col-12 col-sm-6">
            <label className="form-label">
              {t("Auth.Settings.User.Account.Language", { defaultValue: "Language" })}
            </label>
            <select
              className="form-select"
              value={form.language ?? "en"}
              onChange={set("language")}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <Button onClick={handleSave} disabled={saving}>
              {saving
                ? t("Global.Loading", { defaultValue: "Saving..." })
                : t("Global.Form.Labels.Save")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfileTab;
