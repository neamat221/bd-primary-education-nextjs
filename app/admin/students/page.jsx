"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { useAdmin } from "../../../components/AdminProvider";
import { useLang } from "../../../components/LanguageProvider";

const EMPTY_FORM = {
  name: "",
  className: "Class 1",
  section: "A",
  roll: "",
  gender: "F",
  guardian: "",
  phone: "",
};

const EMAIL_RE = /^[+\d][\d\s-]{6,}$/;

export default function AdminStudentsPage() {
  const { t } = useLang();
  const { students, addStudent, updateStudent, removeStudent } = useAdmin();

  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [confirmId, setConfirmId] = useState(null);

  const classNames = useMemo(() => {
    const set = new Set(students.all().map((s) => s.className));
    return ["All classes", ...set];
  }, [students]);

  const shown = useMemo(
    () =>
      students.filter({
        className: classFilter,
        status: statusFilter,
        query,
      }),
    [students, classFilter, statusFilter, query],
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setErrors({});
    setForm({
      name: student.name,
      className: student.className,
      section: student.section,
      roll: student.roll,
      gender: student.gender,
      guardian: student.guardian,
      phone: student.phone,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = t("admin.form.errName");
    if (!/^\d{1,3}$/.test(String(form.roll).trim()))
      found.roll = t("admin.form.errRoll");
    if (!form.guardian.trim()) found.guardian = t("admin.form.errGuardian");
    if (!EMAIL_RE.test(form.phone.trim()))
      found.phone = t("admin.form.errPhone");

    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    if (editingId) {
      updateStudent(editingId, {
        name: form.name.trim(),
        className: form.className,
        section: form.section,
        roll: String(form.roll).padStart(2, "0"),
        gender: form.gender,
        guardian: form.guardian.trim(),
        phone: form.phone.trim(),
      });
    } else {
      addStudent({
        name: form.name.trim(),
        className: form.className,
        section: form.section,
        roll: String(form.roll).padStart(2, "0"),
        gender: form.gender,
        guardian: form.guardian.trim(),
        phone: form.phone.trim(),
      });
    }
    resetForm();
  };

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <>
      <AdminPageHeader
        eyebrow={t("admin.students.eyebrow")}
        title={t("admin.students.title")}
        subtitle={t("admin.students.subtitle")}
        actions={
          <div className="date-chip">
            <UserPlus size={17} />
            <span>{t("admin.students.total", { count: students.count })}</span>
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
                    <Pencil size={15} /> {t("admin.students.editTitle")}
                  </>
                ) : (
                  <>
                    <Plus size={15} /> {t("admin.students.addTitle")}
                  </>
                )}
              </h3>
              <p>{t("admin.students.formHint")}</p>
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
                {t("admin.form.class")}
                <select
                  value={form.className}
                  onChange={(e) => set("className", e.target.value)}
                >
                  <option>Play Group</option>
                  <option>Nursery</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  <option>Class 3</option>
                </select>
              </label>
              <label>
                {t("admin.form.section")}
                <select
                  value={form.section}
                  onChange={(e) => set("section", e.target.value)}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </label>
              <label>
                {t("admin.form.roll")}
                <input
                  value={form.roll}
                  inputMode="numeric"
                  onChange={(e) => set("roll", e.target.value)}
                  aria-invalid={errors.roll ? "true" : undefined}
                />
                {errors.roll && (
                  <span className="field-error">
                    <AlertCircle size={12} /> {errors.roll}
                  </span>
                )}
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                {t("admin.form.gender")}
                <select
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                >
                  <option value="F">{t("admin.form.female")}</option>
                  <option value="M">{t("admin.form.male")}</option>
                </select>
              </label>
              <label>
                {t("admin.form.guardian")}
                <input
                  value={form.guardian}
                  onChange={(e) => set("guardian", e.target.value)}
                  aria-invalid={errors.guardian ? "true" : undefined}
                />
                {errors.guardian && (
                  <span className="field-error">
                    <AlertCircle size={12} /> {errors.guardian}
                  </span>
                )}
              </label>
            </div>
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
              <h3>{t("admin.students.listTitle")}</h3>
              <p>{t("admin.students.showing", { count: shown.length })}</p>
            </div>
          </div>
          <div className="admin-filters">
            <div className="search-box">
              <Search size={15} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("admin.students.search")}
                aria-label={t("admin.students.search")}
              />
            </div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              aria-label={t("admin.form.class")}
            >
              {classNames.map((c) => (
                <option key={c} value={c}>
                  {c === "All classes" ? t("admin.form.allClasses") : c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label={t("admin.form.status")}
            >
              <option value="All">{t("admin.form.allStatus")}</option>
              <option value="active">{t("admin.form.active")}</option>
              <option value="inactive">{t("admin.form.inactive")}</option>
            </select>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("admin.form.name")}</th>
                  <th>{t("admin.form.class")}</th>
                  <th>{t("admin.form.roll")}</th>
                  <th>{t("admin.form.guardian")}</th>
                  <th>{t("admin.form.attendance")}</th>
                  <th aria-label={t("admin.form.actions")} />
                </tr>
              </thead>
              <tbody>
                {shown.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.name}</strong>
                      <small>{s.id}</small>
                    </td>
                    <td>
                      {s.className}-{s.section}
                    </td>
                    <td>{s.roll}</td>
                    <td>
                      {s.guardian}
                      <small>{s.phone}</small>
                    </td>
                    <td>
                      <span className="admin-meter">
                        <i style={{ width: `${s.attendance}%` }} />
                      </span>
                      <small>{s.attendance}%</small>
                    </td>
                    <td className="admin-row-actions">
                      <button
                        className="icon-button"
                        onClick={() => startEdit(s)}
                        aria-label={`${t("admin.form.edit")} ${s.name}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="icon-button admin-danger"
                        onClick={() => setConfirmId(s.id)}
                        aria-label={`${t("admin.form.remove")} ${s.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shown.length === 0 && (
              <div className="empty-state">{t("admin.students.empty")}</div>
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
            <p>{t("admin.students.confirmBody")}</p>
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
                  removeStudent(confirmId);
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
