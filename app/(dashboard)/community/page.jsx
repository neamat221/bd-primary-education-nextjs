"use client";

import { Heart, MessageCircle, Sparkles, Star, Users } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { classmates, notices } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const feed = [
  {
    id: 1,
    who: "Nabila Islam",
    avatar: "👧🏽",
    text: "Finished the Bangla story today! It was about a brave little boy 📖",
    likes: 8,
    time: "1 hour ago",
  },
  {
    id: 2,
    who: "Tanvir Ahmed",
    avatar: "👦🏻",
    text: "Who else is excited for the reading festival on Sunday? 📚",
    likes: 12,
    time: "3 hours ago",
  },
  {
    id: 3,
    who: "Class Teacher",
    avatar: "👩🏽‍🏫",
    text: "Great job on the science observation activities, Class 3-A! Share your plant photos here.",
    likes: 15,
    time: "Yesterday",
    teacher: true,
  },
  {
    id: 4,
    who: "Mim Akter",
    avatar: "👧🏽",
    text: "My art for creativity day is ready 🎨 orange and green!",
    likes: 6,
    time: "Yesterday",
  },
];

export default function CommunityPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={t("community.eyebrow")}
        title={t("community.title")}
        subtitle={t("community.subtitle", { school: t("shell.school") })}
        actions={
          <div className="date-chip">
            <Users size={17} />
            <span>{t("community.classmatesCount")}</span>
          </div>
        }
      />

      <section className="community-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>
                <Sparkles size={15} /> {t("community.feed")}
              </h3>
              <p>{t("community.feedHint")}</p>
            </div>
          </div>
          <div className="feed-list">
            {feed.map((post) => (
              <article className="feed-card" key={post.id}>
                <div className="feed-top">
                  <div className="inbox-avatar">{post.avatar}</div>
                  <div>
                    <strong>
                      {post.teacher ? t("community.teacher") : post.who}
                    </strong>
                    <span>
                      {t(`community.time${post.id}`)}
                      {post.teacher ? ` • ${t("community.teacher")}` : ""}
                    </span>
                  </div>
                </div>
                <p>{t(`community.post${post.id}`)}</p>
                <div className="feed-actions">
                  <button>
                    <Heart size={14} /> {post.likes}
                  </button>
                  <button>
                    <MessageCircle size={14} /> {t("community.reply")}
                  </button>
                  <button>
                    <Star size={14} /> {t("community.cheer")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>{t("community.classmates")}</h3>
                <p>{t("community.classmatesHint")}</p>
              </div>
            </div>
            <div className="classmates-list">
              {classmates.map((c) => (
                <div className="classmate-row" key={c.name}>
                  <div className="inbox-avatar">{c.avatar}</div>
                  <div>
                    <strong>{c.name}</strong>
                    <span>{c.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel community-notices">
            <div className="panel-heading">
              <div>
                <h3>{t("community.notices")}</h3>
                <p>{t("community.noticesHint")}</p>
              </div>
            </div>
            {notices.slice(0, 3).map((notice) => (
              <div className="notice-row" key={notice.title}>
                <div className={`notice-date ${notice.tone}`}>
                  <strong>{notice.day}</strong>
                  <span>{notice.month}</span>
                </div>
                <div className="notice-copy">
                  <strong>{notice.title}</strong>
                  <span>{notice.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
