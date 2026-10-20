"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Megaphone,
  Settings,
  Users,
  X,
} from "lucide-react";
import { adminNavItems } from "../lib/admin";
import { useAdmin } from "./AdminProvider";
import { useLang } from "./LanguageProvider";

const iconMap = {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  Megaphone,
  Settings,
};

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();
  const { t } = useLang();
  const { profile } = useAdmin();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <aside className={`sidebar admin-sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark admin-brand-mark">
          <GraduationCap size={25} strokeWidth={2.5} />
        </div>
        <div>
          <strong>{t("app.name")}</strong>
          <span className="admin-brand-tag">{t("admin.console")}</span>
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

      <div className="nav-label">{t("admin.manage")}</div>
      <nav className="nav-list" aria-label={t("admin.nav")}>
        {adminNavItems.map(({ key, label, href, icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          const CurrentIcon = iconMap[icon];
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
            >
              {CurrentIcon ? <CurrentIcon size={19} /> : null}
              <span>{t(key) || label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card admin-help-card">
          <div className="help-illustration">🛡️</div>
          <strong>{t("admin.helpTitle")}</strong>
          <p>{t("admin.helpHint")}</p>
          <Link href="/">
            <ChevronRight size={15} /> {t("admin.backToStudent")}
          </Link>
        </div>
        <div className="student-mini">
          <div className="avatar avatar-small">{profile.initials}</div>
          <div className="student-mini-copy">
            <strong>{profile.name}</strong>
            <span>{t("admin.role")}</span>
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
              <strong>{profile.name}</strong>
              <span>{profile.email}</span>
              <Link href="/admin/settings">{t("shell.accountSettings")}</Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
