"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import {
  Admin,
  AdminNotices,
  AdminStats,
  Students,
  Teachers,
} from "../lib/admin";
import { useLang } from "./LanguageProvider";

const AdminContext = createContext(null);

const STORAGE_KEY = "sb-admin-data";

const toastIcons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

/* Deep-ish clone of the seed so the in-memory classes never mutate
   the imported module constants. */
function seedState() {
  const students = new Students();
  const teachers = new Teachers();
  const notices = new AdminNotices();
  return {
    students: students.all(),
    teachers: teachers.all(),
    notices: notices.all(),
  };
}

export function AdminProvider({ children }) {
  const { t } = useLang();
  const [data, setData] = useState(seedState);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Adopt any saved admin data after mount so SSR and the first client
  // render match (avoids hydration mismatches).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.students)) setData(parsed);
      }
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data, hydrated]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((list) => [...list, { id, message, type }]);
      if (typeof window !== "undefined") {
        window.setTimeout(() => dismiss(id), 4000);
      }
      return id;
    },
    [dismiss],
  );

  /* -------- live collections -------- */
  const students = useMemo(() => new Students(data.students), [data.students]);
  const teachers = useMemo(() => new Teachers(data.teachers), [data.teachers]);
  const notices = useMemo(() => new AdminNotices(data.notices), [data.notices]);
  const profile = useMemo(() => new Admin(), []);
  const stats = useMemo(
    () => new AdminStats(students, teachers, notices),
    [students, teachers, notices],
  );

  /* -------- mutations -------- */
  const addStudent = useCallback(
    (record) => {
      setData((prev) => {
        const book = new Students(prev.students);
        const created = book.create(record);
        notify(t("admin.students.added", { name: created.name }), "success");
        return { ...prev, students: book.all() };
      });
    },
    [notify, t],
  );

  const updateStudent = useCallback(
    (id, patch) => {
      setData((prev) => {
        const book = new Students(prev.students);
        book.update(id, patch);
        notify(t("admin.students.updated"), "success");
        return { ...prev, students: book.all() };
      });
    },
    [notify, t],
  );

  const removeStudent = useCallback(
    (id) => {
      setData((prev) => {
        const book = new Students(prev.students);
        const target = book.get(id);
        book.remove(id);
        notify(
          t("admin.students.removed", { name: target?.name ?? "" }),
          "info",
        );
        return { ...prev, students: book.all() };
      });
    },
    [notify, t],
  );

  const addTeacher = useCallback(
    (record) => {
      setData((prev) => {
        const book = new Teachers(prev.teachers);
        const created = book.create(record);
        notify(t("admin.teachers.added", { name: created.name }), "success");
        return { ...prev, teachers: book.all() };
      });
    },
    [notify, t],
  );

  const updateTeacher = useCallback(
    (id, patch) => {
      setData((prev) => {
        const book = new Teachers(prev.teachers);
        book.update(id, patch);
        notify(t("admin.teachers.updated"), "success");
        return { ...prev, teachers: book.all() };
      });
    },
    [notify, t],
  );

  const removeTeacher = useCallback(
    (id) => {
      setData((prev) => {
        const book = new Teachers(prev.teachers);
        const target = book.get(id);
        book.remove(id);
        notify(
          t("admin.teachers.removed", { name: target?.name ?? "" }),
          "info",
        );
        return { ...prev, teachers: book.all() };
      });
    },
    [notify, t],
  );

  const addNotice = useCallback(
    (record) => {
      setData((prev) => {
        const book = new AdminNotices(prev.notices);
        const created = book.create(record);
        notify(t("admin.notices.added"), "success");
        return { ...prev, notices: book.all() };
      });
    },
    [notify, t],
  );

  const updateNotice = useCallback(
    (id, patch) => {
      setData((prev) => {
        const book = new AdminNotices(prev.notices);
        book.update(id, patch);
        notify(t("admin.notices.updated"), "success");
        return { ...prev, notices: book.all() };
      });
    },
    [notify, t],
  );

  const removeNotice = useCallback(
    (id) => {
      setData((prev) => {
        const book = new AdminNotices(prev.notices);
        book.remove(id);
        notify(t("admin.notices.removed"), "info");
        return { ...prev, notices: book.all() };
      });
    },
    [notify, t],
  );

  const resetAll = useCallback(() => {
    setData(seedState());
    notify(t("admin.settings.reset"), "info");
  }, [notify, t]);

  const value = useMemo(
    () => ({
      profile,
      students,
      teachers,
      notices,
      stats,
      addStudent,
      updateStudent,
      removeStudent,
      addTeacher,
      updateTeacher,
      removeTeacher,
      addNotice,
      updateNotice,
      removeNotice,
      resetAll,
      notify,
      dismiss,
    }),
    [
      profile,
      students,
      teachers,
      notices,
      stats,
      addStudent,
      updateStudent,
      removeStudent,
      addTeacher,
      updateTeacher,
      removeTeacher,
      addNotice,
      updateNotice,
      removeNotice,
      resetAll,
      notify,
      dismiss,
    ],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
      <div
        className="toast-stack"
        role="region"
        aria-live="polite"
        aria-label={t("shell.notifyRegion")}
      >
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className={`toast toast-${toast.type}`}
              role="status"
            >
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
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used inside <AdminProvider>.");
  }
  return ctx;
}
