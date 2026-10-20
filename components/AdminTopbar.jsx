"use client";

import Link from "next/link";
import { Bell, ChevronDown, ChevronRight, Languages, Menu } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { useLang } from "./LanguageProvider";
import { LANGUAGES } from "../lib/i18n";

export default function AdminTopbar({ title, onOpenMenu }) {
  const { profile } = useAdmin();
  const { lang, toggleLang, t } = useLang();

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
          {t("admin.console")} <ChevronRight size={15} />{" "}
          <strong>{title}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <span className="admin-role-badge">{t("admin.role")}</span>
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
        <Link className="top-profile" href="/admin/settings">
          <div className="avatar">{profile.initials}</div>
          <span>
            <strong>{profile.name}</strong>
            <small>{t("admin.role")}</small>
          </span>
          <ChevronDown size={15} />
        </Link>
      </div>
    </header>
  );
}
