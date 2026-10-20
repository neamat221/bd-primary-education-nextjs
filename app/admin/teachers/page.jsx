"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { useAdmin } from "../../../components/AdminProvider";
import { useLang } from "../../../components/LanguageProvider";

const EMPTY_FORM = {
  name: "",
  subject: "Bangla",
  email: "",
  phone: "",
  classes: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

export default function AdminTeachersPage() {
  const { t } = useLang();
  const { teachers, addTeacher, updateTeacher, removeTeacher } = useAdmin();

  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [confirmId, setConfirmId] = useState(null);

  const subjects = useMemo(
    () => ["All subjects", ...teachers.subjects()],
    [teachers],
  );

  const shown = useMemo(
    () => teachers.filter({ subject: subjectFilter, query }),
    [teachers, subjectFilter, query],
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  };

  const startEdit = (teacher) => {
    setEditingId(teacher.id);
    setErrors({});
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
      classes: teacher.classes.join(", "),
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = t("admin.form.errName");
    if (!EMAIL_RE.test(form.email.trim()))
      found.email = t("admin.form.errEmail");
    if (!PHONE_RE.test(form.phone.trim()))
      found.phone = t("admin.form.errPhone");

    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    const payload = {
      name: form.name.trim(),
      subject: form.subject,
      email: form.email.trim(),
      phone: form.phone.trim(),
      classes: form.classes
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    if (editingId) updateTeacher(editingId, payload);
    else addTeacher(payload);
    resetForm();
  };

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <>
      <AdminPageHeader
        eyebrow={t("admin.teachers.eyebrow")}
        title={t("admin.teachers.title")}
        subtitle={t("admin.teachers.subtitle")}
        actions={
          <div className="date-chip">
            <UserPlus size={17} />
            <span>{t("admin.teachers.total", { count: teachers.count })}</span>
          </div>
        }
      />

      <section className="dashboard-grid admin-crud-grid">
        <div className="panel admin-form-panel">
          <div className="panel-heading">
            <div>
              <h3>
                {editingId ? (
                  <>
                    <Pencil size={15} /> {t("admin.teachers.editTitle")}
                  </>
                ) : (
                  <>
                    <Plus size={15} /> {t("admin.teachers.addTitle")}
                  </>
                )}
              </h3>
              <p>{t("admin.teachers.formHint")}</p>
            </div>
            {editingId && (
              <button
                className="icon-button"
                onClick={resetForm}
                aria-label={t("common.reset")}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <form className="admin-form" onSubmit={submit} noValidate>
            <label>
              {t("admin.form.name")}
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={errors.name ? "true" : undefined}
              />
              {errors.name && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </label>
            <div className="admin-form-row">
              <label>
                {t("admin.form.subject")}
                <select
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                >
                  <option>Bangla</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Science</option>
                  <option>BGS</option>
                  <option>Islam</option>
                  <option>Play &amp; Nursery</option>
                </select>
              </label>
              <label>
                {t("admin.form.classesTaught")}
                <input
                  value={form.classes}
                  onChange={(e) => set("classes", e.target.value)}
                  placeholder="Class 1, Class 2"
                />
              </label>
            </div>
            <label>
              {t("admin.form.email")}
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={errors.email ? "true" : undefined}
              />
              {errors.email && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </label>
            <label>
              {t("admin.form.phone")}
              <input
                value={form.phone}
                inputMode="tel"
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={errors.phone ? "true" : undefined}
              />
              {errors.phone && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.phone}
                </span>
              )}
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="button button-primary">
                {editingId ? (
                  <>
                    <Pencil size={15} /> {t("admin.form.save")}
                  </>
                ) : (
                  <>
                    <Plus size={15} /> {t("admin.form.add")}
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="button button-light"
                  onClick={resetForm}
                >
                  {t("admin.form.cancel")}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="panel admin-table-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("admin.teachers.listTitle")}</h3>
              <p>{t("admin.teachers.showing", { count: shown.length })}</p>
            </div>
          </div>
          <div className="admin-filters">
            <div className="search-box">
              <Search size={15} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("admin.teachers.search")}
                aria-label={t("admin.teachers.search")}
              />
            </div>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              aria-label={t("admin.form.subject")}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s === "All subjects" ? t("admin.form.allSubjects") : s}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-card-list">
            {shown.map((teacher) => (
              <article className="admin-teacher-card" key={teacher.id}>
                <div className="admin-teacher-top">
                  <div className="admin-teacher-avatar">
                    {teacher.name.split(" ")[0][0]}
                  </div>
                  <div className="admin-teacher-meta">
                    <strong>{teacher.name}</strong>
                    <span>
                      {teacher.subject} • {teacher.classes.join(", ")}
                    </span>
                  </div>
                  <span className="admin-rating">
                    <Star size={13} fill="currentColor" /> {teacher.rating}
                  </span>
                </div>
                <div className="admin-teacher-stats">
                  <span>
                    <b>{teacher.students}</b> {t("admin.teachers.students")}
                  </span>
                  <span>
                    <b>{teacher.classes.length}</b>{" "}
                    {t("admin.teachers.classes")}
                  </span>
                  <span className={`admin-status-dot ${teacher.status}`}>
                    {teacher.status}
                  </span>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="button button-light admin-mini-button"
                    onClick={() => startEdit(teacher)}
                  >
                    <Pencil size={14} /> {t("admin.form.edit")}
                  </button>
                  <button
                    className="button button-light admin-mini-button admin-danger-text"
                    onClick={() => setConfirmId(teacher.id)}
                  >
                    <Trash2 size={14} /> {t("admin.form.remove")}
                  </button>
                </div>
              </article>
            ))}
            {shown.length === 0 && (
              <div className="empty-state">{t("admin.teachers.empty")}</div>
            )}
          </div>
        </div>
      </section>

      {confirmId && (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-card">
            <div className="boundary-icon admin-confirm-icon">
              <Trash2 size={26} />
            </div>
            <h3>{t("admin.confirm.title")}</h3>
            <p>{t("admin.teachers.confirmBody")}</p>
            <div className="confirm-actions">
              <button
                className="button button-light"
                onClick={() => setConfirmId(null)}
              >
                {t("admin.form.cancel")}
              </button>
              <button
                className="button button-danger"
                onClick={() => {
                  removeTeacher(confirmId);
                  if (editingId === confirmId) resetForm();
                  setConfirmId(null);
                }}
              >
                <Trash2 size={15} /> {t("admin.form.remove")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
