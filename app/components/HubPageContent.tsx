"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Shield, Sparkles, Wrench } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import CategorySection from "./CategorySection";
import ComplianceNotice from "./ComplianceNotice";
import HeroSection from "./HeroSection";
import SectionHeader from "./SectionHeader";
import SeoFaq from "./SeoFaq";
import ToolsShowcase from "./ToolsShowcase";
import SubsectionCard from "./SubsectionCard";
import ScrollParallax from "./motion/ScrollParallax";
import ScrollReveal from "./motion/ScrollReveal";
import { getHubContent } from "../data/hub-content";
import type { Locale } from "../../i18n/routing";

export default function HubPageContent() {
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const locale = useLocale() as Locale;
  const tSections = useTranslations("sections");
  const tSharing = useTranslations("sharing");
  const tContribute = useTranslations("contribute");

  const { flashovanieCategories, diagnostikaCategories, nastrojeCategories, zdielanieSubsections } =
    getHubContent(locale);

  const generateInstructions = () => {
    if (!password) return;
    setGenerated(true);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const step2Items = tSharing.raw("step2Items") as string[];

  return (
    <div className="page-container relative w-full overflow-x-hidden">
      <HeroSection />

      <ToolsShowcase />

      <ScrollParallax y={[50, -50]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="flashovanie" aria-labelledby="flashovanie-heading">
          <SectionHeader
            id="flashovanie-heading"
            title={tSections("flashovanie.title")}
            description={tSections("flashovanie.description")}
          />

          <div className="space-y-6">
            {flashovanieCategories.map((category, index) => (
              <CategorySection key={category.id} category={category} defaultOpen={index === 0} index={index} />
            ))}
          </div>
        </section>
      </ScrollParallax>

      <ScrollParallax y={[-40, 60]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="diagnostika" aria-labelledby="diagnostika-heading">
          <SectionHeader
            id="diagnostika-heading"
            title={
              <>
                <Wrench className="text-emerald-400 shrink-0" size={28} aria-hidden />
                {tSections("diagnostika.title")}
              </>
            }
            description={tSections("diagnostika.description")}
          />

          <div className="space-y-6">
            {diagnostikaCategories.map((category, index) => (
              <CategorySection key={category.id} category={category} index={index} />
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.1} replay>
            <motion.div
              className="card-interactive mt-8 border-emerald-500/20 bg-emerald-500/5"
              whileHover={reduceMotion ? {} : { scale: 1.01 }}
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="text-emerald-400" size={18} aria-hidden />
                {tSections("safetyWarning.title")}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {tSections("safetyWarning.text")}
              </p>
            </motion.div>
          </ScrollReveal>
        </section>
      </ScrollParallax>

      <ScrollParallax y={[60, -40]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="nastroje" aria-labelledby="nastroje-heading">
          <SectionHeader
            id="nastroje-heading"
            title={tSections("nastroje.title")}
            description={tSections("nastroje.description")}
          />

          <div className="space-y-6">
            {nastrojeCategories.map((category, index) => (
              <CategorySection key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>
      </ScrollParallax>

      <ScrollParallax y={[-50, 50]} opacity={[0.4, 1, 1, 0.4]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="zdielanie" aria-labelledby="zdielanie-heading">
          <SectionHeader
            id="zdielanie-heading"
            title={
              <>
                {tSections("zdielanie.title")}
                <Shield className="text-emerald-400 shrink-0" aria-hidden />
              </>
            }
            description={tSections("zdielanie.description")}
          />

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {zdielanieSubsections.map((subsection, index) => (
              <ScrollReveal
                key={subsection.id}
                delay={index * 0.08}
                direction={index % 2 === 0 ? "left" : "right"}
                replay
              >
                <SubsectionCard subsection={subsection} index={index} />
              </ScrollReveal>
            ))}
          </div>

          <ComplianceNotice />

          <ScrollReveal direction="up" replay>
            <motion.div
              className="card-interactive max-w-2xl relative overflow-hidden"
              whileHover={reduceMotion ? {} : { borderColor: "rgba(16,185,129,0.3)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6 relative">
                <label htmlFor="zip-password" className="block text-sm mb-2 text-zinc-400 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-400" aria-hidden />
                  {tSharing("passwordLabel")}
                </label>
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
                  whileFocus={reduceMotion ? {} : { scale: 1.01 }}
                />
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 flex gap-1"
                  >
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
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={generateInstructions}
                disabled={!password}
                className="w-full py-3.5 bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-medium rounded-2xl relative overflow-hidden"
                whileHover={reduceMotion || !password ? {} : { scale: 1.02 }}
                whileTap={reduceMotion || !password ? {} : { scale: 0.98 }}
              >
                <span className="relative z-10">{tSharing("generate")}</span>
                {password && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {generated && password && (
                  <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduceMotion ? {} : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 border-t border-zinc-800 pt-8 space-y-6 text-sm overflow-hidden"
                  >
                    <motion.div
                      initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="font-semibold mb-3">{tSharing("step1Title")}</h4>
                      <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs border border-zinc-800 whitespace-pre-line">
                        {tSharing("step1Content", { password })}
                      </div>
                      <motion.button
                        onClick={() =>
                          copyToClipboard(tSharing("copyInstruction", { password }))
                        }
                        className="flex items-center gap-2 text-xs mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                        whileTap={reduceMotion ? {} : { scale: 0.95 }}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? tSharing("copied") : tSharing("copy")}
                      </motion.button>
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-semibold mb-2">{tSharing("step2Title")}</h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                        {step2Items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.p
                      className="text-emerald-400 text-xs"
                      initial={reduceMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {tSharing("securityTip")}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </ScrollReveal>
        </section>
      </ScrollParallax>

      <SeoFaq />

      <ScrollReveal direction="up" replay>
        <div className="text-center py-12 text-xs text-zinc-400">
          {tContribute("text")}{" "}
          <a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 font-medium underline underline-offset-2 hover:text-emerald-200"
          >
            {tContribute("github")}
          </a>
          .
        </div>
      </ScrollReveal>
    </div>
  );
}