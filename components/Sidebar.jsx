"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  GraduationCap,
  ChevronDown,
  X,
  Users,
  Settings,
  Home,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Award,
  MessageCircle,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Student, navItems } from "../lib/data";
import { useLang } from "./LanguageProvider";

const iconMap = {
  Home,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Award,
  MessageCircle,
  Users,
  Settings,
  Layers,
};

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const { t } = useLang();
  const me = new Student();

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <GraduationCap size={25} strokeWidth={2.5} />
        </div>
        <div>
          <strong>{t("app.name")}</strong>
          <span>{t("app.tagline")}</span>
        </div>
        <button
          className="icon-button close-menu"
          onClick={onClose}
          aria-label={t("shell.closeMenu")}
        >
          <X size={19} />
        </button>
      </div>

      <div className="school-switcher">
        <div className="school-avatar">🏫</div>
        <div className="school-copy">
          <strong>{t("shell.school")}</strong>
          <span>{t("shell.location")}</span>
        </div>
        <ChevronDown size={16} className="muted-icon" />
      </div>

      <div className="nav-label">{t("shell.learningSpace")}</div>
      <nav className="nav-list" aria-label={t("shell.mainNav")}>
        {navItems.map(({ key, label, href, icon: Icon, count }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const CurrentIcon = iconMap[Icon];
          const text = key ? t(key) : label;
          return (
            <Link
              key={label}
              href={href}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
            >
              {CurrentIcon ? <CurrentIcon size={19} /> : null}
              <span>{text}</span>
              {count ? <span className="nav-count">{count}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-illustration">💡</div>
          <strong>{t("shell.needHelp")}</strong>
          <p>{t("shell.helpHint")}</p>
          <Link href="/messages">
            {t("shell.openGuide")} <ChevronRight size={15} />
          </Link>
        </div>
        <Link href="/admin" className="admin-entry-link">
          <ShieldCheck size={17} />
          <span>{t("admin.console")}</span>
          <ChevronRight size={15} />
        </Link>
        <div className="student-mini">
          <div className="avatar avatar-small">{me.initials}</div>
          <div className="student-mini-copy">
            <strong>{me.name}</strong>
            <span>{me.label}</span>
          </div>
          <button
            className="icon-button"
            onClick={() => setShowProfile(!showProfile)}
            aria-label={t("shell.accountSettings")}
          >
            <ChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="profile-popover">
              <strong>{me.name}</strong>
              <span>{t("shell.studentProfile")}</span>
              <Link href="/settings">{t("shell.accountSettings")}</Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
