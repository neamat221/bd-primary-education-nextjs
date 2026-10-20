"use client";

import { useState } from "react";
import { Award, Lock, Sparkles } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { achievements } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const TABS = ["All", "Earned", "In progress"];
const TAB_KEY = {
  All: "ach.tabAll",
  Earned: "ach.tabEarned",
  "In progress": "ach.tabProgress",
};

export default function AchievementsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState("All");
  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);
  const shown =
    tab === "Earned" ? earned : tab === "In progress" ? locked : achievements;

  return (
    <>
      <PageHeader
        eyebrow={t("ach.eyebrow")}
        title={t("ach.title")}
        subtitle={t("ach.subtitle")}
        actions={
          <div className="date-chip">
            <Award size={17} />
            <span>
              {t("ach.earnedOf", {
                earned: earned.length,
                total: achievements.length,
              })}
            </span>
          </div>
        }
      />

      <section className="stats-grid compact-stats">
        <article className="stat-card">
          <div className="stat-icon stat-orange">
            <Award size={20} />
          </div>
          <div className="stat-label">{t("ach.badgesEarned")}</div>
          <div className="stat-number">
            {earned.length} <span>/ {achievements.length}</span>
          </div>
          <div className="stat-foot">
            <span className="positive">
              <Sparkles size={13} /> +1
            </span>{" "}
            {t("home.thisWeek")}
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-blue">
            <Sparkles size={20} />
          </div>
          <div className="stat-label">{t("ach.points")}</div>
          <div className="stat-number">
            840 <span>{t("common.pts")}</span>
          </div>
          <div className="stat-foot">{t("ach.nextLevel")}</div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-purple">
            <Award size={20} />
          </div>
          <div className="stat-label">{t("ach.classRank")}</div>
          <div className="stat-number">
            #3 <span>{t("ach.ofStudents")}</span>
          </div>
          <div className="stat-foot">
            <span className="positive">↑ 2</span> {t("ach.sinceSeptember")}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>{t("ach.allBadges")}</h3>
            <p>{t("ach.collectAll")}</p>
          </div>
          <div className="tab-pills">
            {TABS.map((value) => (
              <button
                key={value}
                className={`tab-pill ${tab === value ? "active" : ""}`}
                onClick={() => setTab(value)}
                aria-pressed={tab === value}
              >
                {t(TAB_KEY[value])}
              </button>
            ))}
          </div>
        </div>
        <div className="badge-grid">
          {shown.map((a) => (
            <div
              key={a.id}
              className={`badge-card ${a.earned ? "badge-earned" : "badge-locked"}`}
            >
              <div className="badge-icon">{(a.icon || "🏅").trim()}</div>
              <strong>{a.title}</strong>
              <p>{a.detail}</p>
              {a.earned ? (
                <span className="badge-date">
                  <Award size={12} /> {a.date}
                </span>
              ) : (
                <span className="badge-progress">
                  <Lock size={12} /> {a.progress}
                </span>
              )}
            </div>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty-state">{t("ach.empty")}</div>
        )}
      </section>
    </>
  );
}
