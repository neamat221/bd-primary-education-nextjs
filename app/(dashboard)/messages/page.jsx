"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useApp } from "../../../components/AppProvider";
import { Messages } from "../../../lib/data";
import { useLang } from "../../../components/LanguageProvider";

const MAX_LENGTH = 500;

export default function MessagesPage() {
  const { notify, runSafely } = useApp();
  const { t } = useLang();
  const book = useMemo(() => new Messages(), []);
  const [selectedId, setSelectedId] = useState(book.first()?.id ?? null);
  const [thread, setThread] = useState(book.thread);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [composeError, setComposeError] = useState("");

  const selected = useMemo(() => book.find(selectedId), [book, selectedId]);

  if (!selected) {
    return (
      <div className="empty-state">
        <AlertCircle size={22} style={{ marginBottom: 8 }} />
        <p>{t("msg.empty")}</p>
      </div>
    );
  }

  const send = async (e) => {
    e.preventDefault();
    const text = draft.trim();

    if (!text) {
      setComposeError(t("msg.emptyDraft"));
      return;
    }
    if (text.length > MAX_LENGTH) {
      setComposeError(t("msg.tooLong", { max: MAX_LENGTH }));
      return;
    }

    setComposeError("");
    setSending(true);
    const result = await runSafely(
      async () => {
        // Simulated async send — this is where a real API call belongs.
        await new Promise((resolve, reject) => {
          window.setTimeout(
            () => (text ? resolve() : reject(new Error("Empty message"))),
            260,
          );
        });
        return text;
      },
      {
        errorMessage: t("msg.failed"),
      },
    );

    if (result.ok) {
      setThread((list) => [
        ...list,
        { id: `${Date.now()}`, sender: "student", text: result.value },
      ]);
      setDraft("");
      notify(
        t("msg.sent", { name: selected.from.split(" ")[0] }),
        "success",
      );
    }
    setSending(false);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("msg.eyebrow")}
        title={t("msg.title")}
        subtitle={t("msg.subtitle")}
      />

      <section className="messages-grid">
        <div className="panel inbox-panel">
          <div className="panel-heading">
            <div>
              <h3>{t("msg.inbox")}</h3>
              <p>{t("msg.unread", { count: book.unreadCount() })}</p>
            </div>
          </div>
          <div className="inbox-list">
            {book.list.map((m) => (
              <button
                key={m.id}
                className={`inbox-item ${selected.id === m.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(m.id);
                  setComposeError("");
                }}
                aria-pressed={selected.id === m.id}
              >
                <div className="inbox-avatar">{m.avatar}</div>
                <div className="inbox-copy">
                  <div className="inbox-top">
                    <strong>{m.from}</strong>
                    <span>{m.time}</span>
                  </div>
                  <small>{m.role}</small>
                  <p>{m.text}</p>
                </div>
                {m.unread && <i className="unread-dot" />}
              </button>
            ))}
          </div>
        </div>

        <div className="panel chat-panel">
          <div className="chat-header">
            <div className="inbox-avatar">{selected.avatar}</div>
            <div>
              <strong>{selected.from}</strong>
              <span>{selected.role}</span>
            </div>
          </div>
          <div className="chat-thread">
            {thread.length === 0 && (
              <div className="empty-state">{t("msg.threadEmpty")}</div>
            )}
            {thread.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble ${msg.sender === "student" ? "from-student" : "from-teacher"}`}
              >
                {msg.sender === "teacher" && (
                  <span className="chat-sender">{selected.from}</span>
                )}
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-compose" onSubmit={send} noValidate>
            <input
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (composeError) setComposeError("");
              }}
              placeholder={t("msg.placeholder", {
                name: selected.from.split(" ")[0],
              })}
              aria-label={t("msg.write")}
              aria-invalid={composeError ? "true" : undefined}
              maxLength={MAX_LENGTH + 50}
            />
            <button
              type="submit"
              className="button button-primary"
              aria-label={t("msg.send")}
              disabled={sending}
            >
              <Send size={16} />
            </button>
          </form>
          {composeError ? (
            <p className="field-error" role="alert">
              <AlertCircle size={13} /> {composeError}
            </p>
          ) : (
            <p className="chat-note">{t("msg.note")}</p>
          )}
        </div>
      </section>
    </>
  );
}
