"use client";

import { Bell, ChevronDown, ChevronRight, Languages, Menu } from "lucide-react";
import { Student } from "../lib/data";
import { useLang } from "./LanguageProvider";
import { LANGUAGES } from "../lib/i18n";

export default function Topbar({
  title,
  onOpenMenu,
  onToggleProfile,
  showProfile,
}) {
  const { lang, toggleLang, t } = useLang();
  const me = new Student();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu-button"
          onClick={onOpenMenu}
          aria-label={t("shell.openMenu")}
        >
          <Menu size={22} />
        </button>
        <div className="breadcrumb">
          {t("shell.learningSpace")} <ChevronRight size={15} />{" "}
          <strong>{title}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <button
          className="language-toggle"
          onClick={toggleLang}
          aria-label={`${t("shell.language")}: ${lang === "en" ? "English" : "বাংলা"}`}
          title={lang === "en" ? LANGUAGES[1].native : LANGUAGES[0].native}
        >
          <Languages size={16} />
          {lang === "en" ? LANGUAGES[0].label : LANGUAGES[1].label}
          <ChevronDown size={14} />
        </button>
        <button
          className="notification-button"
          aria-label={t("shell.notifications")}
        >
          <Bell size={19} />
          <i />
        </button>
        <div className="topbar-divider" />
        <button className="top-profile" onClick={onToggleProfile}>
          <div className="avatar">{me.initials}</div>
          <span>
            <strong>{me.name}</strong>
            <small>{t("shell.studentAccount")}</small>
          </span>
          <ChevronDown size={15} />
        </button>
      </div>
      {showProfile && (
        <div className="topbar-profile-popover">
          <strong>{me.name}</strong>
          <span>
            {me.display} • {me.section}
          </span>
          <a href="/settings">{t("shell.accountSettings")}</a>
          <a href="/">{t("shell.backOverview")}</a>
        </div>
      )}
    </header>
  );
}
