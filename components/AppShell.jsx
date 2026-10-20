"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, ShieldCheck } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { navItems } from "../lib/data";
import { useLang } from "./LanguageProvider";

export default function AppShell({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  // close drawers and popovers whenever the route changes —
  // navigation should never leave stale UI hanging around
  useEffect(() => {
    setMobileMenu(false);
    setShowProfile(false);
  }, [pathname]);

  // remember scroll position per page instead of jumping to top
  useEffect(() => {
    const saved = sessionStorage.getItem(`scroll:${pathname}`);
    window.scrollTo(0, saved ? Number(saved) : 0);
    const onScroll = () =>
      sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Escape closes any open overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileMenu(false);
        setShowProfile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = navItems.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
  const title = current ? t(current.key) : t("nav.overview");

  return (
    <main className="app-shell">
      {mobileMenu && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenu(false)}
          aria-hidden="true"
        />
      )}
      <Sidebar open={mobileMenu} onClose={() => setMobileMenu(false)} />
      <section className="main-area">
        <Topbar
          title={title}
          onOpenMenu={() => setMobileMenu(true)}
          onToggleProfile={() => setShowProfile(!showProfile)}
          showProfile={showProfile}
        />
        <div className="content-wrap">
          {children}
          <footer className="footer">
            <div>
              <span className="footer-logo">
                <GraduationCap size={17} />
              </span>{" "}
              <strong>{t("app.name")}</strong>{" "}
              <span className="footer-divider">•</span> {t("shell.joyful")}
            </div>
            <div className="footer-links">
              <span>
                <ShieldCheck size={14} /> {t("shell.safeSpace")}
              </span>
              <span>{t("shell.madeWith")}</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
