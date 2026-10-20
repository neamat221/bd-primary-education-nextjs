"use client";

import Link from "next/link";
import {
  Activity,
  Award,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  Megaphone,
  TrendingUp,
  Users,
} from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import { useAdmin } from "../../components/AdminProvider";
import { useLang } from "../../components/LanguageProvider";
import { adminActivity } from "../../lib/admin";

export default function AdminOverviewPage() {
  const { t } = useLang();
  const { profile, stats } = useAdmin();
  const snap = stats.snapshot();
  const byClass = stats.byClass();
  const classEntries = Object.entries(byClass);
  const maxClass = Math.max(...classEntries.map(([, n]) => n), 1);

  const cards = [
    {
      label: t("admin.overview.students"),
      value: snap.students,
      sub: t("admin.overview.active", { count: snap.activeStudents }),
      icon: Users,
      tone: "stat-blue",
    },
    {
      label: t("admin.overview.teachers"),
      value: snap.teachers,
      sub: t("admin.overview.avgRating", { rating: snap.avgRating }),
      icon: GraduationCap,
      tone: "stat-purple",
    },
    {
      label: t("admin.overview.attendance"),
      value: `${snap.attendance}%`,
      sub: t("admin.overview.schoolAverage"),
      icon: ClipboardCheck,
      tone: "stat-green",
    },
    {
      label: t("admin.overview.notices"),
      value: snap.notices,
      sub: t("admin.overview.publishedDrafts", {
        published: snap.published,
        drafts: snap.drafts,
      }),
      icon: Megaphone,
      tone: "stat-orange",
    },
  ];

  const quick = [
    { href: "/admin/students", label: t("admin.quick.addStudent"), icon: Users, tone: "blue" },
    { href: "/admin/teachers", label: t("admin.quick.addTeacher"), icon: GraduationCap, tone: "purple" },
    { href: "/admin/notices", label: t("admin.quick.newNotice"), icon: Megaphone, tone: "orange" },
    { href: "/admin/classes", label: t("admin.quick.viewClasses"), icon: BookOpen, tone: "green" },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow={t("admin.overview.eyebrow")}
        title={t("admin.overview.greeting", { name: profile.firstName })}
        subtitle={t("admin.overview.subtitle")}
        actions={
          <div className="date-chip">
            <Activity size={17} />
            <span>{t("admin.overview.term")}</span>
          </div>
        }
      />

      <section className="stats-grid admin-stats" aria-label={t("admin.overview.eyebrow")}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="stat-card" key={card.label}>
              <div className={`stat-icon ${card.tone}`}>
                <Icon size={20} />
              </div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-number">{card.value}</div>
              <div className="stat-foot">{card.sub}</div>
            </article>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>{t("admin.overview.byClass")}</h3>
              <p>{t("admin.overview.byClassHint")}</p>
            </div>
            <Link href="/admin/classes" className="text-button">
              {t("common.viewAll")} <ChevronRight size={15} />
            </Link>
          </div>
          <div className="admin-bar-list">
            {classEntries.map(([label, count]) => (
              <div className="admin-bar-row" key={label}>
                <span className="admin-bar-label">{label}</span>
                <div className="admin-bar-track">
                  <i
                    className="admin-bar-fill"
                    style={{ width: `${Math.round((count / maxClass) * 100)}%` }}
                  />
                </div>
                <span className="admin-bar-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>{t("admin.overview.quick")}</h3>
              <p>{t("admin.overview.quickHint")}</p>
            </div>
          </div>
          <div className="admin-quick-grid">
            {quick.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-quick-card ${item.tone}`}
                >
                  <span className={`admin-quick-icon ${item.tone}`}>
                    <Icon size={18} />
                  </span>
                  <span>{item.label}</span>
                  <ChevronRight size={15} className="admin-quick-chevron" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>{t("admin.overview.activity")}</h3>
              <p>{t("admin.overview.activityHint")}</p>
            </div>
          </div>
          <div className="admin-activity-list">
            {adminActivity.map((item) => (
              <div className="admin-activity-row" key={item.id}>
                <span className={`admin-activity-dot ${item.tone}`} />
                <div className="admin-activity-copy">
                  <strong>{item.who}</strong>
                  <span>{item.action}</span>
                </div>
                <span className="admin-activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>{t("admin.overview.highlights")}</h3>
              <p>{t("admin.overview.highlightsHint")}</p>
            </div>
          </div>
          <div className="admin-highlight-list">
            <div className="admin-highlight">
              <span className="admin-highlight-icon stat-green">
                <TrendingUp size={18} />
              </span>
              <div>
                <strong>{t("admin.overview.hl1Title")}</strong>
                <span>{t("admin.overview.hl1Body")}</span>
              </div>
            </div>
            <div className="admin-highlight">
              <span className="admin-highlight-icon stat-blue">
                <Award size={18} />
              </span>
              <div>
                <strong>{t("admin.overview.hl2Title")}</strong>
                <span>{t("admin.overview.hl2Body")}</span>
              </div>
            </div>
            <div className="admin-highlight">
              <span className="admin-highlight-icon stat-orange">
                <GraduationCap size={18} />
              </span>
              <div>
                <strong>{t("admin.overview.hl3Title")}</strong>
                <span>{t("admin.overview.hl3Body")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
