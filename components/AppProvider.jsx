"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useLang } from "./LanguageProvider";

const AppContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const { t } = useLang();

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((list) => [...list, { id, message, type }]);
      if (typeof window !== "undefined") {
        window.setTimeout(() => dismiss(id), 4200);
      }
      return id;
    },
    [dismiss],
  );

  // A single funnel for async actions so a thrown/rejected task never
  // leaves the UI frozen or silent.
  const runSafely = useCallback(
    async (
      action,
      { errorMessage = "Something went wrong. Please try again." } = {},
    ) => {
      try {
        return { ok: true, value: await action() };
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[ShikkhaBondhu]", error);
        }
        notify(error?.message || errorMessage, "error");
        return { ok: false, error };
      }
    },
    [notify],
  );

  const value = useMemo(
    () => ({ notify, dismiss, runSafely }),
    [notify, dismiss, runSafely],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <div
        className="toast-stack"
        role="region"
        aria-live="polite"
        aria-label={t("shell.notifyRegion")}
      >
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
              <span className="toast-icon">
                <Icon size={16} />
              </span>
              <span className="toast-message">{toast.message}</span>
              <button
                className="toast-close"
                onClick={() => dismiss(toast.id)}
                aria-label={t("shell.dismiss")}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>.");
  }
  return ctx;
}
