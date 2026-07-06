"use client";

import { useState } from "react";
import { Shield, Wrench } from "lucide-react";
import CategorySection from "./components/CategorySection";
import SubsectionCard from "./components/SubsectionCard";
import {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
} from "./data/hub-content";

export default function FlashDiagnosticsHub() {
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateInstructions = () => {
    if (!password) return;
    setGenerated(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Skopírované do schránky");
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* HERO */}
      <section className="pt-20 pb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm mb-6">
          Open Source • Zadarmo • Profesionálne
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
          Flash Diagnostics Hub
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-zinc-400 leading-relaxed">
          Kompletné centrum pre flashovanie mobilných zariadení — Samsung, Motorola, Xiaomi, Pixel,
          MediaTek a Qualcomm. Podrobné návody, diagnostika bootloopu, odomknutie bootloadera
          a bezpečné zdieľanie firmvéru s odkazmi na oficiálne súbory.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="#zdielanie"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-medium rounded-2xl transition-colors"
          >
            Začať s bezpečným zdieľaním
          </a>
          <a
            href="#flashovanie"
            className="px-8 py-4 border border-zinc-700 hover:bg-zinc-900 rounded-2xl transition-colors"
          >
            Prehliadnuť postupy
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
          <a href="#motorola" className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
            Motorola
          </a>
          <a href="#fastboot-adb" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
            Fastboot
          </a>
          <a href="#odin-samsung" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
            Odin
          </a>
          <a href="#sp-flash" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
            SP Flash
          </a>
          <a href="#bootloop-brick" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
            Diagnostika
          </a>
        </div>
      </section>

      {/* FLASHOVANIE */}
      <section id="flashovanie" className="py-16 border-t border-zinc-800">
        <h2 className="section-title">Flashovanie zariadení</h2>
        <p className="text-zinc-400 max-w-3xl mb-10 leading-relaxed">
          Vyber značku alebo metódu flashovania. Každá kategória obsahuje prehľad, podrobný postup
          krok za krokom, tipy, upozornenia a priame odkazy na stiahnutie nástrojov a firmvéru.
        </p>

        <div className="space-y-6">
          {flashovanieCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} defaultOpen={index === 0} />
          ))}
        </div>
      </section>

      {/* DIAGNOSTIKA */}
      <section id="diagnostika" className="py-16 border-t border-zinc-800">
        <h2 className="section-title flex items-center gap-3">
          <Wrench className="text-emerald-400" size={28} />
          Diagnostika problémov
        </h2>
        <p className="text-zinc-400 max-w-3xl mb-10 leading-relaxed">
          Diagnostika bootloopu, bricku, EDL režimu a USB problémov. Samostatná sekcia pre Motorola
          špecifické chyby vrátane radio, IMEI a bootloader warning.
        </p>

        <div className="space-y-6">
          {diagnostikaCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

        <div className="card mt-8 border-emerald-500/20 bg-emerald-500/5">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="text-emerald-400" size={18} />
            Bezpečnostné upozornenie
          </h3>
          <p className="text-sm text-zinc-400">
            Vždy používaj len oficiálne alebo overené nástroje a firmvér pre presný model zariadenia.
            Zálohuj dôležité dáta pred akýmkoľvek zásahom. Nesprávny flash môže trvalo poškodiť zariadenie.
          </p>
        </div>
      </section>

      {/* NÁSTROJE */}
      <section id="nastroje" className="py-16 border-t border-zinc-800">
        <h2 className="section-title">Nástroje a firmvér</h2>
        <p className="text-zinc-400 max-w-3xl mb-10 leading-relaxed">
          Oficiálne flash nástroje (RSA, LMSA, Odin, Mi Flash, SP Flash), USB drivery a katalógy
          firmvéru pre Motorola, Samsung, Xiaomi a Google Pixel.
        </p>

        <div className="space-y-6">
          {nastrojeCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* BEZPEČNÉ ZDIEĽANIE */}
      <section id="zdielanie" className="py-16 border-t border-zinc-800">
        <h2 className="section-title flex items-center gap-3">
          Bezpečné zdieľanie <Shield className="text-emerald-400" />
        </h2>
        <p className="text-zinc-400 max-w-2xl mb-8">
          Interaktívny nástroj na vytvorenie password-protected ZIP archívu (AES-256) a bezpečné zdieľanie.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {zdielanieSubsections.map((subsection, index) => (
            <SubsectionCard key={subsection.id} subsection={subsection} index={index} />
          ))}
        </div>

        <div className="card max-w-2xl">
          <div className="mb-6">
            <label className="block text-sm mb-2 text-zinc-400">Zadaj heslo pre ZIP archív</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="napr. MojeSilneHeslo2026!"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={generateInstructions}
            disabled={!password}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-950 font-medium rounded-2xl transition-colors"
          >
            Vygenerovať bezpečné inštrukcie
          </button>

          {generated && password && (
            <div className="mt-8 border-t border-zinc-800 pt-8 space-y-6 text-sm">
              <div>
                <h4 className="font-semibold mb-3">1. Vytvor password-protected ZIP (7-Zip)</h4>
                <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs border border-zinc-800">
                  Pravý klik na priečinok → 7-Zip → Add to archive<br />
                  Archive format: <strong>zip</strong><br />
                  Encryption method: <strong>AES-256</strong><br />
                  Password: <strong>{password}</strong>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Pravý klik → 7-Zip → Add to archive → AES-256 + heslo: ${password}`
                    )
                  }
                  className="text-xs mt-2 text-emerald-400 hover:underline"
                >
                  Skopírovať inštrukciu
                </button>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Odporúčané spôsoby zdieľania</h4>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>SwissTransfer.com alebo WeTransfer (s heslom v samostatnej správe)</li>
                  <li>Súkromný GitHub repo + heslo cez Signal/Threema</li>
                  <li>Proton Drive / Mega.nz s end-to-end šifrovaním</li>
                </ul>
              </div>

              <div className="text-emerald-400 text-xs">
                Bezpečnostný tip: Heslo nikdy neposielaj rovnakým kanálom ako súbor.
              </div>
            </div>
          )}
        </div>
      </section>

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
    </div>
  );
}