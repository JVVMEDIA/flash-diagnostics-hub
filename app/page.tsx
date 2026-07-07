"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Shield, Sparkles, Wrench } from "lucide-react";
import CategorySection from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import SectionHeader from "./components/SectionHeader";
import ToolsShowcase from "./components/ToolsShowcase";
import SubsectionCard from "./components/SubsectionCard";
import ScrollParallax from "./components/motion/ScrollParallax";
import ScrollReveal from "./components/motion/ScrollReveal";
import {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
} from "./data/hub-content";

export default function FlashDiagnosticsHub() {
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

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
    <div className="page-container relative w-full overflow-x-hidden">
      <HeroSection />

      <ToolsShowcase />

      {/* FLASHOVANIE */}
      <ScrollParallax y={[50, -50]} className="py-16 border-t border-zinc-800/80 scroll-mt-24" >
      <section id="flashovanie">
        <SectionHeader
          title="Flashovanie zariadení"
          description="Vyber značku alebo metódu flashovania — Motorola, Samsung, MediaTek, Unisoc/UFS a ďalšie. Každá kategória obsahuje postup, tipy a odkazy na nástroje."
        />

        <div className="space-y-6">
          {flashovanieCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} defaultOpen={index === 0} index={index} />
          ))}
        </div>
      </section>
      </ScrollParallax>

      {/* DIAGNOSTIKA */}
      <ScrollParallax y={[-40, 60]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
      <section id="diagnostika">
        <SectionHeader
          title={
            <>
              <Wrench className="text-emerald-400 shrink-0" size={28} />
              Diagnostika problémov
            </>
          }
          description="Diagnostika bootloopu, bricku, EDL režimu a USB problémov. Samostatná sekcia pre Motorola špecifické chyby vrátane radio, IMEI a bootloader warning."
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
              <Shield className="text-emerald-400" size={18} />
              Bezpečnostné upozornenie
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Vždy používaj len oficiálne alebo overené nástroje a firmvér pre presný model zariadenia.
              Zálohuj dôležité dáta pred akýmkoľvek zásahom. Nesprávny flash môže trvalo poškodiť zariadenie.
            </p>
          </motion.div>
        </ScrollReveal>
      </section>
      </ScrollParallax>

      {/* NÁSTROJE */}
      <ScrollParallax y={[60, -40]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
      <section id="nastroje">
        <SectionHeader
          title="Nástroje a firmvér"
          description="Oficiálne flash nástroje (RSA, LMSA, Odin, Mi Flash, SP Flash), USB drivery a katalógy firmvéru pre Motorola, Samsung, Xiaomi a Google Pixel."
        />

        <div className="space-y-6">
          {nastrojeCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>
      </ScrollParallax>

      {/* BEZPEČNÉ ZDIEĽANIE */}
      <ScrollParallax y={[-50, 50]} opacity={[0.4, 1, 1, 0.4]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
      <section id="zdielanie">
        <SectionHeader
          title={
            <>
              Bezpečné zdieľanie
              <Shield className="text-emerald-400 shrink-0" />
            </>
          }
          description="Interaktívny nástroj na vytvorenie password-protected ZIP archívu (AES-256) a bezpečné zdieľanie firmvéru a citlivých súborov."
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

        <ScrollReveal direction="up" replay>
          <motion.div
            className="card-interactive max-w-2xl relative overflow-hidden"
            whileHover={reduceMotion ? {} : { borderColor: "rgba(16,185,129,0.3)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="mb-6 relative">
              <label className="block text-sm mb-2 text-zinc-400 flex items-center gap-2">
                <Sparkles size={14} className="text-emerald-400" />
                Zadaj heslo pre ZIP archív
              </label>
              <motion.input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setGenerated(false);
                }}
                placeholder="napr. MojeSilneHeslo2026!"
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
              <span className="relative z-10">Vygenerovať bezpečné inštrukcie</span>
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
                    <h4 className="font-semibold mb-3">1. Vytvor password-protected ZIP (7-Zip)</h4>
                    <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs border border-zinc-800">
                      Pravý klik na priečinok → 7-Zip → Add to archive<br />
                      Archive format: <strong>zip</strong><br />
                      Encryption method: <strong>AES-256</strong><br />
                      Password: <strong>{password}</strong>
                    </div>
                    <motion.button
                      onClick={() =>
                        copyToClipboard(
                          `Pravý klik → 7-Zip → Add to archive → AES-256 + heslo: ${password}`
                        )
                      }
                      className="flex items-center gap-2 text-xs mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                      whileTap={reduceMotion ? {} : { scale: 0.95 }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Skopírované!" : "Skopírovať inštrukciu"}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="font-semibold mb-2">2. Odporúčané spôsoby zdieľania</h4>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      <li>SwissTransfer.com alebo WeTransfer (s heslom v samostatnej správe)</li>
                      <li>Súkromný GitHub repo + heslo cez Signal/Threema</li>
                      <li>Proton Drive / Mega.nz s end-to-end šifrovaním</li>
                    </ul>
                  </motion.div>

                  <motion.p
                    className="text-emerald-400 text-xs"
                    initial={reduceMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Bezpečnostný tip: Heslo nikdy neposielaj rovnakým kanálom ako súbor.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>
      </section>
      </ScrollParallax>

      <ScrollReveal direction="up" replay>
        <div className="text-center py-12 text-xs text-zinc-500">
          Projekt je open-source. Prispieť môžeš na{" "}
          <a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            GitHub-e
          </a>
          .
        </div>
      </ScrollReveal>
    </div>
  );
}