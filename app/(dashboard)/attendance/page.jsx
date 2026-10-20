"use client";

import { useMemo } from "react";
import { Check, ClipboardCheck, Clock3, Flame, X } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Attendance } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const statusMeta = {
  present: { key: "attendance.presentLabel", icon: Check, cls: "present" },
  absent: { key: "attendance.absentLabel", icon: X, cls: "absent" },
  late: { key: "attendance.lateLabel", icon: Clock3, cls: "late" },
  holiday: { key: "attendance.holidayLabel", icon: null, cls: "holiday" },
};

const weekdays = [
  "day.Saturday",
  "day.Sunday",
  "day.Monday",
  "day.Tuesday",
  "day.Wednesday",
  "day.Thursday",
  "day.Friday",
];

export default function AttendancePage() {
  const { t } = useLang();
  const record = useMemo(() => new Attendance(), []);
  const { present, absent, late, percent } = record.summary();

  return (
    <>
      <PageHeader
        eyebrow={t("attendance.eyebrow")}
        title={t("attendance.title")}
        subtitle={t("attendance.subtitle")}
        actions={
          <div className="date-chip">
            <ClipboardCheck size={17} />
            <span>{t("attendance.month")}</span>
          </div>
        }
      />

      <section className="stats-grid compact-stats">
        <article className="stat-card">
          <div className="stat-icon stat-green">
            <Check size={20} />
          </div>
          <div className="stat-label">{t("attendance.present")}</div>
          <div className="stat-number">
            {present} <span>{t("common.days")}</span>
          </div>
          <div className="stat-foot">
            <span className="positive">{t("attendance.excellent")}</span>{" "}
            {t("attendance.keepItUp")}
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-orange">
            <Clock3 size={20} />
          </div>
          <div className="stat-label">{t("attendance.late")}</div>
          <div className="stat-number">
            {late} <span>{t("common.days")}</span>
          </div>
          <div className="stat-foot">{t("attendance.reachBy")}</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-rose">
            <X size={20} />
          </div>
          <div className="stat-label">{t("attendance.absent")}</div>
          <div className="stat-number">
            {absent} <span>{t("common.day")}</span>
          </div>
          <div className="stat-foot">{t("attendance.wellNotes")}</div>
        </article>
        <article className="stat-card streak-card">
          <div className="stat-icon stat-purple">
            <Flame size={20} />
          </div>
          <div className="stat-label">{t("attendance.rate")}</div>
          <div className="stat-number">
            {percent}
            <span>%</span> 🔥
          </div>
          <div className="stat-foot">{t("attendance.classAverage")}</div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>{t("attendance.calendar")}</h3>
            <p>{t("attendance.calendarHint")}</p>
          </div>
        </div>
        <div className="calendar-weekdays">
          {weekdays.map((d) => (
            <span key={d}>{t(d)}</span>
          ))}
        </div>
        <div className="calendar-grid">
          <div className="calendar-cell empty" />
          <div className="calendar-cell empty" />
          {record.days.map((d) => {
            const meta = statusMeta[d.status];
            const Icon = meta.icon;
            return (
              <div
                key={d.day}
                className={`calendar-cell ${meta.cls}`}
                title={t(meta.key)}
              >
                <span className="day-number">{d.day}</span>
                {Icon ? (
                  <span className="day-mark">
                    <Icon size={13} />
                  </span>
                ) : (
                  <span className="day-mark holiday-mark">🌴</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="calendar-legend">
          <span>
            <i className="legend-dot green" /> {t("attendance.presentLabel")}
          </span>
          <span>
            <i className="legend-dot orange" /> {t("attendance.lateLabel")}
          </span>
          <span>
            <i className="legend-dot rose" /> {t("attendance.absentLabel")}
          </span>
          <span>
            <i className="legend-dot gray" /> {t("attendance.holidayLabel")}
          </span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>{t("attendance.record")}</h3>
            <p>{t("attendance.recordHint")}</p>
          </div>
        </div>
        <div className="record-list">
          <div className="record-row">
            <span className="record-date">{t("attendance.rec1Date")}</span>
            <span className="record-tag late">{t("attendance.rec1")}</span>
          </div>
          <div className="record-row">
            <span className="record-date">{t("attendance.rec2Date")}</span>
            <span className="record-tag absent">{t("attendance.rec2")}</span>
          </div>
          <div className="record-row">
            <span className="record-date">{t("attendance.rec3Date")}</span>
            <span className="record-tag late">{t("attendance.rec3")}</span>
          </div>
        </div>
      </section>
    </>
  );
}
