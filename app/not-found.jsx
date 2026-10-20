"use client";

import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { useLang } from "../components/LanguageProvider";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="boundary boundary-full">
      <div className="boundary-card">
        <div className="boundary-mark">🧭</div>
        <h1>{t("error.notFoundTitle")}</h1>
        <p>{t("error.notFoundBody")}</p>
        <div className="boundary-actions">
          <Link className="button button-primary" href="/">
            <Home size={16} /> {t("error.overview")}
          </Link>
          <Link className="button button-light" href="/learning">
            <Compass size={16} /> {t("error.explore")}
          </Link>
        </div>
      </div>
    </main>
  );
}
