"use client";

import { useState } from "react";
import {
  AlertCircle,
  Bell,
  Building2,
  Database,
  Globe,
  RotateCcw,
  ShieldCheck,
  User,
} from "lucide-react";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { useAdmin } from "../../../components/AdminProvider";
import { useLang } from "../../../components/LanguageProvider";

export default function AdminSettingsPage() {
  const { t } = useLang();
  const { profile, stats, resetAll, notify } = useAdmin();
  const snap = stats.snapshot();

  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    school: profile.school,
    location: profile.location,
  });
  const [errors, setErrors] = useState({});
  const [toggles, setToggles] = useState({
    notifyEnroll: true,
    notifyAttendance: true,
    notifyNotices: true,
    notifyTeachers: false,
  });
  const [confirmReset, setConfirmReset] = useState(false);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const save = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = t("admin.form.errName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      found.email = t("admin.form.errEmail");
    if (Object.keys(found).length) {
      setErrors(found);
      notify(t("settings.fixFields"), "error");
      return;
    }
    notify(t("settings.saved"), "success");
  };

  const toggle = (key) => setToggles((v) => ({ ...v, [key]: !v[key] }));

  return (
    <>
      <AdminPageHeader
        eyebrow={t("admin.settings.eyebrow")}
        title={t("admin.settings.title")}
        subtitle={t("admin.settings.subtitle")}
      />

      <form className="settings-grid" onSubmit={save} noValidate>
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <User size={15} /> {t("admin.settings.profile")}
              </h3>
              <p>{t("admin.settings.profileHint")}</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              {t("admin.form.name")}
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={errors.name ? "true" : undefined}
              />
              {errors.name && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </label>
            <label>
              {t("admin.form.email")}
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? "true" : undefined}
              />
              {errors.email && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Building2 size={15} /> {t("admin.settings.school")}
              </h3>
              <p>{t("admin.settings.schoolHint")}</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              {t("admin.settings.schoolName")}
              <input
                value={form.school}
                onChange={(e) => update("school", e.target.value)}
              />
            </label>
            <label>
              {t("admin.settings.schoolLocation")}
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Globe size={15} /> {t("settings.languageContact")}
              </h3>
              <p>{t("admin.settings.languageHint")}</p>
            </div>
          </div>
          <p className="safety-copy">{t("admin.settings.languageCopy")}</p>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Bell size={15} /> {t("settings.notifications")}
              </h3>
              <p>{t("admin.settings.notifyHint")}</p>
            </div>
          </div>
          <div className="toggle-list">
            {[
              [
                "notifyEnroll",
                t("admin.settings.notifyEnroll"),
                t("admin.settings.notifyEnrollHint"),
              ],
              [
                "notifyAttendance",
                t("admin.settings.notifyAttendance"),
                t("admin.settings.notifyAttendanceHint"),
              ],
              [
                "notifyNotices",
                t("admin.settings.notifyNotices"),
                t("admin.settings.notifyNoticesHint"),
              ],
              [
                "notifyTeachers",
                t("admin.settings.notifyTeachers"),
                t("admin.settings.notifyTeachersHint"),
              ],
            ].map(([key, label, hint]) => (
              <label className="toggle-row" key={key}>
                <span>
                  <strong>{label}</strong>
                  <small>{hint}</small>
                </span>
                <input
                  type="checkbox"
                  checked={toggles[key]}
                  onChange={() => toggle(key)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="panel safety-panel">
          <div className="panel-heading">
            <div>
              <h3>
                <ShieldCheck size={15} /> {t("admin.settings.data")}
              </h3>
              <p>{t("admin.settings.dataHint")}</p>
            </div>
          </div>
          <div className="admin-data-summary">
            <span>
              <b>{snap.students}</b> {t("admin.overview.students")}
            </span>
            <span>
              <b>{snap.teachers}</b> {t("admin.overview.teachers")}
            </span>
            <span>
              <b>{snap.notices}</b> {t("admin.overview.notices")}
            </span>
          </div>
          <p className="safety-copy">{t("admin.settings.dataCopy")}</p>
          <div className="toggle-row static">
            <span>
              <strong>
                <Database size={14} /> {t("admin.settings.storeLocal")}
              </strong>
              <small>{t("admin.settings.storeLocalHint")}</small>
            </span>
            <input type="checkbox" checked readOnly />
          </div>
        </div>

        <div className="settings-save">
          <button type="submit" className="button button-primary">
            {t("common.save")}
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={() => setConfirmReset(true)}
          >
            <RotateCcw size={15} /> {t("admin.settings.resetData")}
          </button>
        </div>
      </form>

      {confirmReset && (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-card">
            <div className="boundary-icon admin-confirm-icon">
              <RotateCcw size={26} />
            </div>
            <h3>{t("admin.settings.resetTitle")}</h3>
            <p>{t("admin.settings.resetBody")}</p>
            <div className="confirm-actions">
              <button
                className="button button-light"
                onClick={() => setConfirmReset(false)}
              >
                {t("admin.form.cancel")}
              </button>
              <button
                className="button button-danger"
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
              >
                <RotateCcw size={15} /> {t("admin.settings.resetConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
