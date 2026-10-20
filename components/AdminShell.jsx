"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, ShieldCheck } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { adminNavItems } from "../lib/admin";
import { useLang } from "./LanguageProvider";

export default function AdminShell({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = adminNavItems.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href),
  );
  const title = current
    ? t(current.key) || current.label
    : t("admin.nav.overview");

  return (
    <main className="app-shell admin-shell">
      {mobileMenu && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenu(false)}
          aria-hidden="true"
        />
      )}
      <AdminSidebar open={mobileMenu} onClose={() => setMobileMenu(false)} />
      <section className="main-area">
        <AdminTopbar title={title} onOpenMenu={() => setMobileMenu(true)} />
        <div className="content-wrap">
          {children}
          <footer className="footer">
            <div>
              <span className="footer-logo">
                <GraduationCap size={17} />
              </span>{" "}
              <strong>{t("app.name")}</strong>{" "}
              <span className="footer-divider">•</span> {t("admin.console")}
            </div>
            <div className="footer-links">
              <span>
                <ShieldCheck size={14} /> {t("admin.secure")}
              </span>
              <span>{t("shell.madeWith")}</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
