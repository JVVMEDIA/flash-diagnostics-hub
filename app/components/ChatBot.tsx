"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buildChatKnowledge, findChatAnswer } from "../data/chat-knowledge";
import { fastNavigateToHash } from "../data/navigation";
import type { Locale } from "../../i18n/routing";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  link?: string;
  linkLabel?: string;
};

export default function ChatBot() {
  const locale = useLocale() as Locale;
  const t = useTranslations("chat");
  const tFaq = useTranslations("faq");
  const tRoot = useTranslations();

  const knowledge = useMemo(
    () =>
      buildChatKnowledge(locale, {
        greeting: t("greeting"),
        fallback: t("fallback"),
        faqSection: t("faqSection"),
        goToFaq: t("goToFaq"),
        faq: tFaq.raw("items") as { question: string; answer: string }[],
        mainSections: tRoot.raw("mainSections") as { id: string; name: string; description: string }[],
      }),
    [locale, t, tFaq, tRoot]
  );

  const chatQuickQuestions = useMemo(
    () => (tFaq.raw("items") as { question: string; answer: string }[]).map((item) => item.question),
    [tFaq]
  );

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{ id: "welcome", role: "bot", text: t("welcome") }]);
  }, [t]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "instant" });
  }, [messages, open]);

  const reply = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: trimmed },
    ]);

    const match = findChatAnswer(trimmed, knowledge);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: match.answer,
          link: match.link,
          linkLabel: match.linkLabel,
        },
      ]);
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    setInput("");
    reply(value);
  };

  const handleLink = (hash: string) => {
    setOpen(false);
    fastNavigateToHash(hash);
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-[70] flex flex-col items-start gap-3">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={t("ariaLabel")}
          className="w-[min(100vw-2rem,22rem)] sm:w-80 rounded-2xl border border-zinc-700/80 bg-zinc-950/95 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[min(70dvh,28rem)]"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800 bg-emerald-500/10">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-300">{t("title")}</p>
              <p className="text-xs text-zinc-400 truncate">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              aria-label={t("closeChat")}
            >
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-500/20 text-emerald-100 border border-emerald-500/25"
                      : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.link && msg.linkLabel && (
                    <button
                      type="button"
                      onClick={() => handleLink(msg.link!)}
                      className="mt-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      → {msg.linkLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {chatQuickQuestions.slice(0, 3).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => reply(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors text-left"
                >
                  {q.length > 42 ? `${q.slice(0, 42)}…` : q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-3 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 min-w-0 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
              aria-label={t("messageAria")}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 p-2.5 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label={t("sendAria")}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-emerald-500/40 bg-emerald-500 text-zinc-950 font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors touch-manipulation"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t("closeChatbot") : t("openChat")}
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        {open ? t("close") : t("button")}
      </button>
    </div>
  );
}