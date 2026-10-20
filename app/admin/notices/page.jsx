"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Eye,
  Megaphone,
  Pencil,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { useAdmin } from "../../../components/AdminProvider";
import { useLang } from "../../../components/LanguageProvider";

const EMPTY_FORM = {
  title: "",
  audience: "Whole school",
  body: "",
  date: "",
  tone: "blue",
};

const TONES = ["blue", "orange", "purple", "green", "rose"];

export default function AdminNoticesPage() {
  const { t } = useLang();
  const { notices, addNotice, updateNotice, removeNotice } = useAdmin();

  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [confirmId, setConfirmId] = useState(null);

  const shown = useMemo(
    () => notices.filter({ status: statusFilter }),
    [notices, statusFilter],
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  };

  const startEdit = (notice) => {
    setEditingId(notice.id);
    setErrors({});
    setForm({
      title: notice.title,
      audience: notice.audience,
      body: notice.body,
      date: notice.date,
      tone: notice.tone,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.title.trim()) found.title = t("admin.form.errTitle");
    if (!form.body.trim()) found.body = t("admin.form.errBody");
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const payload = {
      title: form.title.trim(),
      audience: form.audience,
      body: form.body.trim(),
      date: form.date.trim() || t("admin.notices.today"),
      tone: form.tone,
    };
    if (editingId) updateNotice(editingId, payload);
    else addNotice(payload);
    resetForm();
  };

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleStatus = (notice) => {
    updateNotice(notice.id, {
      status: notice.status === "published" ? "draft" : "published",
    });
  };

  return (
    <>
      <AdminPageHeader
        eyebrow={t("admin.notices.eyebrow")}
        title={t("admin.notices.title")}
        subtitle={t("admin.notices.subtitle")}
        actions={
          <div className="date-chip">
            <Megaphone size={17} />
            <span>
              {t("admin.overview.publishedDrafts", {
                published: notices.publishedCount,
                drafts: notices.draftCount,
              })}
            </span>
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
                    <Pencil size={15} /> {t("admin.notices.editTitle")}
                  </>
                ) : (
                  <>
                    <Plus size={15} /> {t("admin.notices.addTitle")}
                  </>
                )}
              </h3>
              <p>{t("admin.notices.formHint")}</p>
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
              {t("admin.form.title")}
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                aria-invalid={errors.title ? "true" : undefined}
              />
              {errors.title && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.title}
                </span>
              )}
            </label>
            <div className="admin-form-row">
              <label>
                {t("admin.form.audience")}
                <select
                  value={form.audience}
                  onChange={(e) => set("audience", e.target.value)}
                >
                  <option>Whole school</option>
                  <option>Class 1 &amp; 2</option>
                  <option>Class 3</option>
                  <option>Parents</option>
                  <option>Teachers</option>
                </select>
              </label>
              <label>
                {t("admin.form.date")}
                <input
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  placeholder="22 Oct 2026"
                />
              </label>
            </div>
            <label>
              {t("admin.form.tone")}
              <div className="admin-tone-picker">
                {TONES.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    className={`admin-tone-swatch ${tone} ${form.tone === tone ? "active" : ""}`}
                    onClick={() => set("tone", tone)}
                    aria-label={tone}
                    aria-pressed={form.tone === tone}
                  />
                ))}
              </div>
            </label>
            <label>
              {t("admin.form.body")}
              <textarea
                rows={4}
                value={form.body}
                onChange={(e) => set("body", e.target.value)}
                aria-invalid={errors.body ? "true" : undefined}
              />
              {errors.body && (
                <span className="field-error">
                  <AlertCircle size={12} /> {errors.body}
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
              <h3>{t("admin.notices.listTitle")}</h3>
              <p>{t("admin.notices.showing", { count: shown.length })}</p>
            </div>
            <div className="tab-pills">
              {[
                ["All", "admin.form.allStatus"],
                ["published", "admin.notices.published"],
                ["draft", "admin.notices.draft"],
              ].map(([value, key]) => (
                <button
                  key={value}
                  className={`tab-pill ${statusFilter === value ? "active" : ""}`}
                  onClick={() => setStatusFilter(value)}
                  aria-pressed={statusFilter === value}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-notice-list">
            {shown.map((notice) => (
              <article className="admin-notice-card" key={notice.id}>
                <span className={`admin-notice-tone ${notice.tone}`} />
                <div className="admin-notice-main">
                  <div className="admin-notice-top">
                    <strong>{notice.title}</strong>
                    <span className={`admin-status-pill ${notice.status}`}>
                      {notice.status === "published"
                        ? t("admin.notices.published")
                        : t("admin.notices.draft")}
                    </span>
                  </div>
                  <p>{notice.body}</p>
                  <div className="admin-notice-meta">
                    <span>{notice.audience}</span>
                    <span>•</span>
                    <span>{notice.date}</span>
                    <span>•</span>
                    <span>{notice.time}</span>
                  </div>
                </div>
                <div className="admin-notice-actions">
                  <button
                    className="icon-button"
                    onClick={() => toggleStatus(notice)}
                    aria-label={
                      notice.status === "published"
                        ? t("admin.notices.unpublish")
                        : t("admin.notices.publish")
                    }
                    title={
                      notice.status === "published"
                        ? t("admin.notices.unpublish")
                        : t("admin.notices.publish")
                    }
                  >
                    {notice.status === "published" ? (
                      <Eye size={15} />
                    ) : (
                      <Send size={15} />
                    )}
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => startEdit(notice)}
                    aria-label={`${t("admin.form.edit")} ${notice.title}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="icon-button admin-danger"
                    onClick={() => setConfirmId(notice.id)}
                    aria-label={`${t("admin.form.remove")} ${notice.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
            {shown.length === 0 && (
              <div className="empty-state">{t("admin.notices.empty")}</div>
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
            <p>{t("admin.notices.confirmBody")}</p>
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
                  removeNotice(confirmId);
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
