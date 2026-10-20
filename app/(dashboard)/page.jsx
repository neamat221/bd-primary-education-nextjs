"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Search,
  Sparkles,
  Star,
  Zap,
  BarChart3,
} from "lucide-react";
import { notices, Tasks, Subjects, Student } from "../../lib/data";
import { useApp } from "../../components/AppProvider";
import { useLang } from "../../components/LanguageProvider";

export default function HomePage() {
  const { notify } = useApp();
  const { t } = useLang();
  const taskBook = useMemo(() => new Tasks(), []);
  const subjectBook = useMemo(() => new Subjects(), []);
  const me = useMemo(() => new Student(), []);
  const [filter, setFilter] = useState("All tasks");
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState(() => taskBook.doneIds());
  const [showAllNotices, setShowAllNotices] = useState(false);

  const filteredTasks = useMemo(
    () => taskBook.filter({ status: filter, query, completed }),
    [taskBook, filter, completed, query],
  );

  const toggleTask = (id) => {
    setCompleted((current) => {
      const isDone = current.includes(id);
      const next = isDone
        ? current.filter((item) => item !== id)
        : [...current, id];
      const task = taskBook.get(id);
      if (task) {
        notify(
          isDone
            ? t("home.undoneTask", { title: task.title })
            : t("home.doneTask", { title: task.title }),
          isDone ? "info" : "success",
        );
      }
      return next;
    });
  };

  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={15} /> {t("home.eyebrow")}
          </div>
          <h1>
            {t("home.greeting", { name: me.firstName })}{" "}
            <span className="wave">👋</span>
          </h1>
          <p className="welcome-subtitle">{t("home.subtitle")}</p>
        </div>
        <div className="date-chip">
          <CalendarDays size={17} />
          <span>{t("home.date")}</span>
        </div>
      </section>

      <section className="hero-banner">
        <div className="hero-text">
          <div className="hero-pill">
            <Zap size={14} fill="currentColor" /> {t("home.journey")}
          </div>
          <h2>
            {t("home.heroTitle1")}
            <br />
            {t("home.heroTitle2")}
          </h2>
          <p>{t("home.heroText")}</p>
          <Link href="/learning" className="button button-primary">
            {t("home.continue")} <ChevronRight size={17} />
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-shape" />
          <div className="art-star star-one">✦</div>
          <div className="art-star star-two">✧</div>
          <div className="book-stack">
            <div className="book book-green" />
            <div className="book book-orange" />
            <div className="book book-blue" />
            <div className="book-pages" />
          </div>
          <div className="plant-pot">
            <div className="leaf leaf-a" />
            <div className="leaf leaf-b" />
            <div className="leaf leaf-c" />
            <div className="pot" />
          </div>
          <div className="hero-character">🧑🏽‍🎓</div>
          <div className="floating-note">
            <Star size={14} fill="currentColor" /> {t("home.youCanDoIt")}
          </div>
        </div>
        <div className="hero-decoration deco-a" />
        <div className="hero-decoration deco-b" />
      </section>

      <section className="stats-grid" aria-label={t("home.myProgress")}>
        <article className="stat-card">
          <div className="stat-icon stat-blue">
            <BookOpen size={20} />
          </div>
          <div className="stat-label">{t("home.lessonsCompleted")}</div>
          <div className="stat-number">
            24 <span>/ 32</span>
          </div>
          <div className="mini-progress">
            <i style={{ width: "75%", background: "#5487ed" }} />
          </div>
          <div className="stat-foot">
            <span className="positive">↑ 12%</span> {t("home.fromLastWeek")}
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-green">
            <ClipboardCheck size={20} />
          </div>
          <div className="stat-label">{t("home.attendance")}</div>
          <div className="stat-number">
            96<span>%</span>
          </div>
          <div className="stat-foot">
            <span className="positive">
              <Check size={13} /> {t("home.excellent")}
            </span>{" "}
            {t("home.keepItUp")}
          </div>
          <div className="stat-sparkline">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-orange">
            <Award size={20} />
          </div>
          <div className="stat-label">{t("home.learningPoints")}</div>
          <div className="stat-number">
            840 <span>{t("common.pts")}</span>
          </div>
          <div className="stat-foot">
            <span className="positive">
              <Sparkles size={13} /> +120 {t("common.pts")}
            </span>{" "}
            {t("home.thisWeek")}
          </div>
          <div className="points-bubbles">
            <i>✦</i>
            <i>✦</i>
            <i>✦</i>
          </div>
        </article>
        <article className="stat-card streak-card">
          <div className="stat-icon stat-purple">
            <Activity size={20} />
          </div>
          <div className="stat-label">{t("home.streak")}</div>
          <div className="stat-number">
            7 <span>{t("common.days")}</span> 🔥
          </div>
          <div className="stat-foot">
            {t("home.best", { days: `10 ${t("common.days")}` })}
          </div>
          <div className="streak-days">
            <b>M</b>
            <b>T</b>
            <b>W</b>
            <b>T</b>
            <b>F</b>
            <b>S</b>
            <b>S</b>
          </div>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="panel subjects-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("home.myProgress")}</h3>
              <p>{t("home.progressHint")}</p>
            </div>
            <Link href="/learning" className="text-button">
              {t("common.viewAll")} <ChevronRight size={15} />
            </Link>
          </div>
          <div className="subjects-list">
            {subjectBook.top(4).map((subject) => (
              <div className="subject-row" key={subject.english}>
                <div className={`subject-symbol ${subject.color}`}>
                  {subject.icon}
                </div>
                <div className="subject-info">
                  <div className="subject-title">
                    <strong>{subject.name}</strong>
                    <span>{subject.percent}%</span>
                  </div>
                  <div className="progress-track">
                    <i
                      className={subject.color}
                      style={{ width: `${subject.percent}%` }}
                    />
                  </div>
                  <small>{subject.lessons}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="encouragement">
            <div className="encourage-icon">🌱</div>
            <span>
              <strong>{t("home.growing")}</strong>
              <small>{t("home.growingHint")}</small>
            </span>
            <ChevronRight size={17} />
          </div>
        </div>

        <div className="panel tasks-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("home.todayPlan")}</h3>
              <p>{t("home.planHint")}</p>
            </div>
            <div className="task-total">
              {taskBook.progress(completed).done}/
              {taskBook.progress(completed).total}
            </div>
          </div>
          <div className="task-controls">
            <div className="search-box">
              <Search size={15} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("home.findTask")}
                aria-label={t("home.findTask")}
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label={t("home.filterTasks")}
            >
              <option value="All tasks">{t("home.allTasks")}</option>
              <option value="Pending">{t("home.pending")}</option>
              <option value="Completed">{t("home.completed")}</option>
            </select>
          </div>
          <div className="task-list">
            {filteredTasks.map((task) => {
              const done = completed.includes(task.id);
              return (
                <div
                  className={`task-row ${done ? "task-done" : ""}`}
                  key={task.id}
                >
                  <button
                    className={`task-check ${done ? "checked" : ""}`}
                    onClick={() => toggleTask(task.id)}
                    aria-label={`${task.title}`}
                  >
                    {done && <Check size={14} />}
                  </button>
                  <div className={`task-dot ${task.color}`} />
                  <div className="task-copy">
                    <strong>{task.title}</strong>
                    <span>
                      {task.subject} · {task.detail}
                    </span>
                  </div>
                  <Link
                    href="/learning"
                    className="task-open"
                    aria-label={`${t("nav.learning")}: ${task.title}`}
                  >
                    <ChevronRight size={17} />
                  </Link>
                </div>
              );
            })}
            {filteredTasks.length === 0 && (
              <div className="empty-state">{t("home.noTasks")}</div>
            )}
          </div>
          <div className="task-footer">
            <span>
              <Clock3 size={14} /> {t("home.timeLeft")}
            </span>
            <Link href="/learning" className="text-button">
              {t("home.seeAllTasks")} <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="panel weekly-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("home.weekly")}</h3>
              <p>{t("home.weeklyHint")}</p>
            </div>
            <button className="select-period">
              {t("home.thisWeekPeriod")} <ChevronDown size={14} />
            </button>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-blue" /> {t("home.learningTime")}
            </span>
            <span>
              <i className="legend-yellow" /> {t("home.goal")}
            </span>
          </div>
          <div className="bar-chart">
            {[
              ["Mon", 55, 68],
              ["Tue", 78, 70],
              ["Wed", 62, 70],
              ["Thu", 88, 72],
              ["Fri", 68, 70],
              ["Sat", 45, 55],
              ["Sun", 35, 45],
            ].map(([day, actual, goal]) => (
              <div className="bar-group" key={day}>
                <div className="bar-pair">
                  <div
                    className="bar actual"
                    style={{ height: `${actual}%` }}
                  />
                  <div className="bar goal" style={{ height: `${goal}%` }} />
                </div>
                <span>{day}</span>
              </div>
            ))}
          </div>
          <div className="chart-summary">
            <span className="summary-icon">
              <BarChart3 size={16} />
            </span>
            <span>{t("home.weeklySummary", { time: "4h 25m" })}</span>
          </div>
        </div>
        <div className="panel notices-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("home.notices")}</h3>
              <p>{t("home.noticesHint")}</p>
            </div>
            <button
              className="icon-button"
              aria-label={t("home.notices")}
              onClick={() => setShowAllNotices(!showAllNotices)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          {(showAllNotices ? notices : notices.slice(0, 2)).map((notice) => (
            <div className="notice-row" key={notice.title}>
              <div className={`notice-date ${notice.tone}`}>
                <strong>{notice.day}</strong>
                <span>{notice.month}</span>
              </div>
              <div className="notice-copy">
                <strong>{notice.title}</strong>
                <span>{notice.meta}</span>
              </div>
              <ChevronRight size={16} className="notice-chevron" />
            </div>
          ))}
          <button
            className="all-notices"
            onClick={() => setShowAllNotices(!showAllNotices)}
          >
            {showAllNotices ? t("home.showLess") : t("home.viewAllNotices")}{" "}
            <ChevronRight size={15} />
          </button>
        </div>
      </section>
    </>
  );
}
