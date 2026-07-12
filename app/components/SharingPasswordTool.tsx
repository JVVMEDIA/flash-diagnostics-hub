"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSkipHeavyMotion } from "../hooks/usePerformanceMode";

export default function SharingPasswordTool() {
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const lite = useSkipHeavyMotion();
  const skipMotion = reduceMotion || lite;
  const tSharing = useTranslations("sharing");
  const step2Items = tSharing.raw("step2Items") as string[];

  const generateInstructions = () => {
    if (!password) return;
    setGenerated(true);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`card-interactive max-w-2xl relative overflow-hidden ${
        skipMotion ? "" : "hover:border-emerald-500/30"
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none perf-hide-lite" />

      <div className="mb-6 relative">
        <label htmlFor="zip-password" className="block text-sm mb-2 text-zinc-400 flex items-center gap-2">
          <Sparkles size={14} className="text-emerald-400" aria-hidden />
          {tSharing("passwordLabel")}
        </label>
        {skipMotion ? (
          <input
            id="zip-password"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setGenerated(false);
            }}
            placeholder={tSharing("passwordPlaceholder")}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
          />
        ) : (
          <motion.input
            id="zip-password"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setGenerated(false);
            }}
            placeholder={tSharing("passwordPlaceholder")}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
            whileFocus={{ scale: 1.01 }}
          />
        )}
        {password.length > 0 && (
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  password.length >= level * 4
                    ? password.length >= 12
                      ? "bg-emerald-500"
                      : password.length >= 8
                        ? "bg-amber-500"
                        : "bg-red-500"
                    : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {skipMotion ? (
        <button
          type="button"
          onClick={generateInstructions}
          disabled={!password}
          className="w-full py-3.5 bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-medium rounded-2xl"
        >
          {tSharing("generate")}
        </button>
      ) : (
        <motion.button
          type="button"
          onClick={generateInstructions}
          disabled={!password}
          className="w-full py-3.5 bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-medium rounded-2xl relative overflow-hidden"
          whileHover={!password ? {} : { scale: 1.02 }}
          whileTap={!password ? {} : { scale: 0.98 }}
        >
          <span className="relative z-10">{tSharing("generate")}</span>
          {password && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      )}

      {skipMotion ? (
        generated &&
        password && (
          <div className="mt-8 border-t border-zinc-800 pt-8 space-y-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3">{tSharing("step1Title")}</h4>
              <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs border border-zinc-800 whitespace-pre-line">
                {tSharing("step1Content", { password })}
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(tSharing("copyInstruction", { password }))}
                className="flex items-center gap-2 text-xs mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? tSharing("copied") : tSharing("copy")}
              </button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{tSharing("step2Title")}</h4>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                {step2Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-emerald-400 text-xs">{tSharing("securityTip")}</p>
          </div>
        )
      ) : (
        <AnimatePresence>
          {generated && password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 border-t border-zinc-800 pt-8 space-y-6 text-sm overflow-hidden"
            >
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h4 className="font-semibold mb-3">{tSharing("step1Title")}</h4>
                <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs border border-zinc-800 whitespace-pre-line">
                  {tSharing("step1Content", { password })}
                </div>
                <motion.button
                  type="button"
                  onClick={() => copyToClipboard(tSharing("copyInstruction", { password }))}
                  className="flex items-center gap-2 text-xs mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? tSharing("copied") : tSharing("copy")}
                </motion.button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h4 className="font-semibold mb-2">{tSharing("step2Title")}</h4>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  {step2Items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.p
                className="text-emerald-400 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {tSharing("securityTip")}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}