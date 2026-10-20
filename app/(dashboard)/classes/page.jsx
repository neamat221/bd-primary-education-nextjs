"use client";

import { useMemo, useState } from "react";
import { BookOpen, Layers, Search, Sparkles } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { classLevels, allSubjects } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const ALL_SUBJECTS = "All subjects";

export default function ClassesPage() {
  const { t } = useLang();
  const [activeClass, setActiveClass] = useState(classLevels[0].key);
  const [activeSubject, setActiveSubject] = useState(ALL_SUBJECTS);
  const [query, setQuery] = useState("");

  const currentClass = useMemo(
    () => classLevels.find((c) => c.key === activeClass) ?? classLevels[0],
    [activeClass],
  );

  const subjectsInClass = useMemo(() => {
    const set = new Set(currentClass.activities.map((a) => a.subject));
    return [ALL_SUBJECTS, ...set];
  }, [currentClass]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return currentClass.activities.filter((a) => {
      const matchesSubject =
        activeSubject === ALL_SUBJECTS || a.subject === activeSubject;
      const matchesQuery =
        !q ||
        `${a.title} ${a.subject} ${a.description}`.toLowerCase().includes(q);
      return matchesSubject && matchesQuery;
    });
  }, [currentClass, activeSubject, query]);

  const totalActivities = classLevels.reduce(
    (sum, c) => sum + c.activities.length,
    0,
  );

  return (
    <>
      <PageHeader
        eyebrow={t("classes.eyebrow")}
        title={t("classes.title")}
        subtitle={t("classes.subtitle")}
        actions={
          <div className="date-chip">
            <Layers size={17} />
            <span>
              {t("classes.count", {
                classes: classLevels.length,
                activities: totalActivities,
              })}
            </span>
          </div>
        }
      />

      <section className="class-tabs" aria-label={t("classes.choose")}>
        {classLevels.map((c) => (
          <button
            key={c.key}
            className={`class-tab ${c.accent} ${activeClass === c.key ? "active" : ""}`}
            onClick={() => {
              setActiveClass(c.key);
              setActiveSubject(ALL_SUBJECTS);
            }}
            aria-pressed={activeClass === c.key}
          >
            <span className="class-tab-icon">{c.icon}</span>
            <span className="class-tab-copy">
              <strong>{c.label}</strong>
              <small>
                {c.bengali} • {c.ageRange}
              </small>
            </span>
            <span className="class-tab-count">{c.activities.length}</span>
          </button>
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>
              {currentClass.label}
              <span className="subject-english">
                {currentClass.bengali} • {currentClass.level}
              </span>
            </h3>
            <p>
              <Sparkles size={13} />{" "}
              {t("classes.activitiesAcross", {
                activities: currentClass.activities.length,
                subjects: subjectsInClass.length - 1,
              })}
            </p>
          </div>
        </div>

        <div className="task-controls">
          <div className="search-box">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("classes.searchActivities")}
              aria-label={t("classes.searchActivities")}
            />
          </div>
          <select
            value={activeSubject}
            onChange={(e) => setActiveSubject(e.target.value)}
            aria-label={t("classes.filterSubject")}
          >
            {subjectsInClass.map((s) => (
              <option key={s} value={s}>
                {s === ALL_SUBJECTS ? t("common.allSubjects") : s}
              </option>
            ))}
          </select>
        </div>

        <div className="activity-grid">
          {shown.map((activity) => (
            <article className="activity-card" key={activity.id}>
              <div className="activity-top">
                <span className={`activity-badge ${currentClass.accent}`}>
                  <BookOpen size={13} /> {activity.subject}
                </span>
                <span
                  className={`difficulty-pill ${activity.difficulty.toLowerCase()}`}
                >
                  {activity.difficulty}
                </span>
              </div>
              <strong>{activity.title}</strong>
              <p>{activity.description}</p>
              <span className="activity-id">{activity.id}</span>
            </article>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty-state">{t("classes.noMatch")}</div>
        )}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>{t("classes.subjectsAll")}</h3>
            <p>{t("classes.subjectsAllHint")}</p>
          </div>
        </div>
        <div className="subject-cloud">
          {allSubjects.map((s) => (
            <span key={s} className="subject-chip">
              {s}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
