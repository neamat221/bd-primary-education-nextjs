"use client";

import { useState } from "react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { routine, routineDays, routineSubjects } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

export default function RoutinePage() {
  const { t } = useLang();
  const [day, setDay] = useState("Saturday");
  const dayName = (d) => t(`day.${d}`);
  const dayShort = (d) => {
    const name = dayName(d);
    return name.slice(0, 3);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("routine.eyebrow")}
        title={t("routine.title")}
        subtitle={t("routine.subtitle")}
        actions={
          <div className="date-chip">
            <CalendarDays size={17} />
            <span>{t("routine.term")}</span>
          </div>
        }
      />

      <section className="routine-toolbar">
        {routineDays.map((d) => (
          <button
            key={d}
            className={`day-pill ${day === d ? "active" : ""}`}
            onClick={() => setDay(d)}
          >
            {dayShort(d)}
            <small>{dayName(d)}</small>
          </button>
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>{t("routine.schedule", { day: dayName(day) })}</h3>
            <p>
              <Clock3 size={13} /> {t("routine.hours")}
            </p>
          </div>
          <div className="date-chip">
            <MapPin size={15} />
            <span>{t("routine.room")}</span>
          </div>
        </div>
        <div className="routine-table-wrap">
          <table className="routine-table">
            <thead>
              <tr>
                <th>{t("routine.time")}</th>
                {routineDays.map((d) => (
                  <th key={d} className={day === d ? "col-active" : ""}>
                    {dayShort(d)}
                    <small>{dayName(d)}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routine.map((row, i) => (
                <tr key={row.time}>
                  <td className="time-cell">{row.time}</td>
                  {row.periods.map((p, j) => {
                    const isActive = routineDays[j] === day;
                    return (
                      <td key={j} className={`${isActive ? "col-active" : ""}`}>
                        <span
                          className={`period-chip ${routineSubjects[p] || "gray"}`}
                        >
                          {p}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="routine-legend">
          <span>
            <i className="legend-dot rose" /> {t("subject.Bangla")}
          </span>
          <span>
            <i className="legend-dot blue" /> {t("subject.Math")}
          </span>
          <span>
            <i className="legend-dot purple" /> {t("subject.English")}
          </span>
          <span>
            <i className="legend-dot green" /> {t("subject.Science")}
          </span>
          <span>
            <i className="legend-dot orange" /> {t("subject.BGS")}
          </span>
          <span>
            <i className="legend-dot teal" /> {t("subject.Islam")}
          </span>
          <span>
            <i className="legend-dot gray" /> {t("routine.activities")}
          </span>
        </div>
      </section>

      <section className="stats-grid compact-stats">
        <article className="stat-card">
          <div className="stat-icon stat-blue">
            <CalendarDays size={20} />
          </div>
          <div className="stat-label">{t("routine.next")}</div>
          <div className="stat-number" style={{ fontSize: 20 }}>
            {t("subject.Science")}
          </div>
          <div className="stat-foot">{t("routine.nextStarts")}</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-green">
            <Clock3 size={20} />
          </div>
          <div className="stat-label">{t("routine.ends")}</div>
          <div className="stat-number" style={{ fontSize: 20 }}>
            12:20 PM
          </div>
          <div className="stat-foot">{t("routine.periodsToday")}</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-orange">
            <MapPin size={20} />
          </div>
          <div className="stat-label">{t("routine.roomLabel")}</div>
          <div className="stat-number" style={{ fontSize: 20 }}>
            3-A
          </div>
          <div className="stat-foot">{t("routine.roomHint")}</div>
        </article>
      </section>
    </>
  );
}
