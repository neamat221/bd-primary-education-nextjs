"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useLang } from "../../components/LanguageProvider";

export default function Error({ error, reset }) {
  const { t } = useLang();

  useEffect(() => {
    // Surface the failure for local debugging without leaking internals to users.
    if (process.env.NODE_ENV !== "production") {
      console.error("[ShikkhaBondhu] page error:", error);
    }
  }, [error]);

  return (
    <main className="boundary boundary-inline">
      <div className="boundary-card">
        <div className="boundary-icon">
          <AlertTriangle size={30} />
        </div>
        <h1>{t("error.title")}</h1>
        <p>{t("error.body")}</p>
        <div className="boundary-actions">
          <button className="button button-primary" onClick={() => reset()}>
            <RefreshCw size={16} /> {t("common.tryAgain")}
          </button>
          <a className="button button-light" href="/">
            {t("error.overview")}
          </a>
        </div>
      </div>
    </main>
  );
}
