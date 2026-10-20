"use client";

import { useState } from "react";
import {
  AlertCircle,
  Bell,
  Globe,
  Lock,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useApp } from "../../../components/AppProvider";
import { Student } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const me = new Student();

const initialForm = {
  name: me.name,
  className: me.className,
  section: me.section,
  roll: me.roll,
  email: "parent.ayesha@example.com",
  phone: "+880 1700-000000",
  language: "বাংলা",
  notifyTasks: true,
  notifyNotices: true,
  notifyMessages: true,
  darkHomework: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form, t) {
  const errors = {};
  if (!form.name.trim()) errors.name = t("settings.errName");
  if (!/^\d{1,3}$/.test(String(form.roll).trim()))
    errors.roll = t("settings.errRoll");
  if (!EMAIL_RE.test(form.email.trim()))
    errors.email = t("settings.errEmail");
  if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim()))
    errors.phone = t("settings.errPhone");
  return errors;
}

export default function SettingsPage() {
  const { notify, runSafely } = useApp();
  const { t } = useLang();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const save = async (e) => {
    e.preventDefault();

    const found = validate(form, t);
    if (Object.keys(found).length) {
      setErrors(found);
      notify(t("settings.fixFields"), "error");
      return;
    }

    setErrors({});
    setSaving(true);
    const result = await runSafely(
      async () => {
        await new Promise((resolve) => window.setTimeout(resolve, 320));
        return true;
      },
      { errorMessage: t("settings.saveFailed") },
    );

    if (result.ok) notify(t("settings.saved"), "success");
    setSaving(false);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("settings.eyebrow")}
        title={t("settings.title")}
        subtitle={t("settings.subtitle")}
      />

      <form className="settings-grid" onSubmit={save} noValidate>
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <User size={15} /> {t("settings.profile")}
              </h3>
              <p>{t("settings.profileHint")}</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              {t("settings.fullName")}
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <span className="field-error" id="err-name">
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </label>
            <label>
              {t("settings.class")}
              <select
                value={form.className}
                onChange={(e) => update("className", e.target.value)}
              >
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
                <option>Class 4</option>
                <option>Class 5</option>
              </select>
            </label>
            <label>
              {t("settings.section")}
              <select
                value={form.section}
                onChange={(e) => update("section", e.target.value)}
              >
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </label>
            <label>
              {t("settings.roll")}
              <input
                value={form.roll}
                inputMode="numeric"
                onChange={(e) => update("roll", e.target.value)}
                aria-invalid={errors.roll ? "true" : undefined}
                aria-describedby={errors.roll ? "err-roll" : undefined}
              />
              {errors.roll && (
                <span className="field-error" id="err-roll">
                  <AlertCircle size={12} /> {errors.roll}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Globe size={15} /> {t("settings.languageContact")}
              </h3>
              <p>{t("settings.languageHint")}</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              {t("settings.preferredLanguage")}
              <select
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
              >
                <option>বাংলা</option>
                <option>English</option>
              </select>
            </label>
            <label>
              {t("settings.parentEmail")}
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="err-email">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </label>
            <label>
              {t("settings.parentPhone")}
              <input
                value={form.phone}
                inputMode="tel"
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={errors.phone ? "true" : undefined}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <span className="field-error" id="err-phone">
                  <AlertCircle size={12} /> {errors.phone}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Bell size={15} /> {t("settings.notifications")}
              </h3>
              <p>{t("settings.notificationsHint")}</p>
            </div>
          </div>
          <div className="toggle-list">
            {[
              [
                "notifyTasks",
                t("settings.notifyTasks"),
                t("settings.notifyTasksHint"),
              ],
              [
                "notifyNotices",
                t("settings.notifyNotices"),
                t("settings.notifyNoticesHint"),
              ],
              [
                "notifyMessages",
                t("settings.notifyMessages"),
                t("settings.notifyMessagesHint"),
              ],
              [
                "darkHomework",
                t("settings.notifyHomework"),
                t("settings.notifyHomeworkHint"),
              ],
            ].map(([key, label, hint]) => (
              <label className="toggle-row" key={key}>
                <span>
                  <strong>{label}</strong>
                  <small>{hint}</small>
                </span>
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => update(key, e.target.checked)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="panel safety-panel">
          <div className="panel-heading">
            <div>
              <h3>
                <ShieldCheck size={15} /> {t("settings.safety")}
              </h3>
              <p>{t("settings.safetyHint")}</p>
            </div>
          </div>
          <p className="safety-copy">{t("settings.safetyCopy")}</p>
          <div className="toggle-row static">
            <span>
              <strong>
                <Lock size={14} /> {t("settings.privateToggle")}
              </strong>
              <small>{t("settings.privateHint")}</small>
            </span>
            <input type="checkbox" checked readOnly />
          </div>
        </div>

        <div className="settings-save">
          <button
            type="submit"
            className="button button-primary"
            disabled={saving}
          >
            <Save size={16} />{" "}
            {saving ? t("common.saving") : t("common.save")}
          </button>
          <button
            type="button"
            className="button button-light"
            onClick={() => {
              setForm(initialForm);
              setErrors({});
              notify(t("settings.discarded"), "info");
            }}
          >
            {t("common.reset")}
          </button>
        </div>
      </form>
    </>
  );
}
