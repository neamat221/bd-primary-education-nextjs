"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Subjects } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

export default function LearningPage() {
  const { t } = useLang();
  const subjectBook = useMemo(() => new Subjects(), []);
  const [active, setActive] = useState(subjectBook.first()?.english ?? null);
  const subject = subjectBook.get(active) ?? subjectBook.first();
  const subjectLessons = active ? subjectBook.lessonsFor(active) : [];

  if (!subject) {
    return (
      <div className="empty-state">
        <BookOpen size={22} style={{ marginBottom: 8 }} />
        <p>{t("learning.noSubjects")}</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t("learning.eyebrow")}
        title={t("learning.title")}
        subtitle={t("learning.subtitle")}
      />

      <section className="learning-grid">
        <div className="panel subjects-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("learning.allSubjects")}</h3>
              <p>{t("learning.termCount", { count: subjectBook.count })}</p>
            </div>
          </div>
          <div className="subjects-list">
            {subjectBook.all().map((s) => (
              <button
                key={s.english}
                className={`subject-row subject-select ${active === s.english ? "selected" : ""}`}
                onClick={() => setActive(s.english)}
              >
                <div className={`subject-symbol ${s.color}`}>{s.icon}</div>
                <div className="subject-info">
                  <div className="subject-title">
                    <strong>{s.name}</strong>
                    <span>{s.percent}%</span>
                  </div>
                  <div className="progress-track">
                    <i className={s.color} style={{ width: `${s.percent}%` }} />
                  </div>
                  <small>
                    {s.lessons} • {s.teacher}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel lesson-panel">
          <div className="panel-heading">
            <div>
              <h3>
                {subject.name}{" "}
                <span className="subject-english">{subject.english}</span>
              </h3>
              <p>
                <BookOpen size={13} /> {subject.book} • {subject.teacher}
              </p>
            </div>
            <div className={`subject-symbol large ${subject.color}`}>
              {subject.icon}
            </div>
          </div>
          <div className="lesson-list">
            {subjectLessons.map((lesson, i) => (
              <div
                className={`lesson-row ${lesson.done ? "lesson-done" : ""}`}
                key={lesson.title}
              >
                <div className={`lesson-index ${lesson.done ? "done" : ""}`}>
                  {lesson.done ? <Check size={14} /> : i + 1}
                </div>
                <div className="lesson-copy">
                  <strong>{lesson.title}</strong>
                  <span>
                    <Clock3 size={12} /> {lesson.minutes} {t("common.minutes")}
                  </span>
                </div>
                <button
                  className="lesson-play"
                  aria-label={t("learning.start", { title: lesson.title })}
                >
                  <PlayCircle size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="encouragement">
            <div className="encourage-icon">🌟</div>
            <span>
              <strong>
                {t("learning.finishBadge", { subject: subject.english })}
              </strong>
              <small>
                {subject.lessons} — {t("learning.keepGoing")}
              </small>
            </span>
            <ChevronRight size={17} />
          </div>
        </div>
      </section>

      <section className="panel tips-panel">
        <div className="panel-heading">
          <div>
            <h3>
              <Sparkles size={15} /> {t("learning.tips")}
            </h3>
            <p>{t("learning.tipsHint")}</p>
          </div>
        </div>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🕐</div>
            <strong>{t("learning.tip1Title")}</strong>
            <p>{t("learning.tip1Body")}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🗣</div>
            <strong>{t("learning.tip2Title")}</strong>
            <p>{t("learning.tip2Body")}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">✍</div>
            <strong>{t("learning.tip3Title")}</strong>
            <p>{t("learning.tip3Body")}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🙋</div>
            <strong>{t("learning.tip4Title")}</strong>
            <p>{t("learning.tip4Body")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
