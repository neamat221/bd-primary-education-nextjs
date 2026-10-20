"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { translate } from "../lib/i18n";

export default function GlobalError({ error, reset }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ShikkhaBondhu] global error:", error);
    }
    try {
      const saved = window.localStorage.getItem("sb-lang");
      if (saved) setLang(saved);
    } catch {
      // ignore
    }
  }, [error]);

  return (
    <html lang={lang}>
      <body>
        <main className="boundary boundary-full">
          <div className="boundary-card">
            <div className="boundary-mark">🎈</div>
            <h1>{translate(lang, "error.globalTitle")}</h1>
            <p>{translate(lang, "error.globalBody")}</p>
            <div className="boundary-actions">
              <button className="button button-primary" onClick={() => reset()}>
                <RefreshCw size={16} /> {translate(lang, "error.reload")}
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
