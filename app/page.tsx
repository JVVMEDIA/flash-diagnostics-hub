"use client";

import { useState } from "react";
import { Shield, Zap, Wrench, Download } from "lucide-react";

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
        <p className="max-w-2xl mx-auto text-xl text-zinc-400">
          Centrum pre flashovanie mobilných zariadení, diagnostiku problémov s firmvérom 
          a bezpečné zdieľanie chránených súborov.
        </p>
        <div className="flex gap-4 justify-center mt-10">
          <a href="#zdielanie" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-medium rounded-2xl transition-colors">
            Začať s bezpečným zdieľaním
          </a>
          <a href="#flashovanie" className="px-8 py-4 border border-zinc-700 hover:bg-zinc-900 rounded-2xl transition-colors">
            Prehliadnuť postupy
          </a>
        </div>
      </section>

      {/* FLASHOVANIE */}
      <section id="flashovanie" className="py-16 border-t border-zinc-800">
        <h2 className="section-title">Flashovanie zariadení</h2>
        <p className="text-zinc-400 max-w-2xl mb-10">Postupy pre najčastejšie používané metódy a značky.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Fastboot / ADB", desc: "Google Pixel, Xiaomi, OnePlus a ďalšie" },
            { title: "Odin (Samsung)", desc: "Oficiálne Samsung nástroje a postupy" },
            { title: "SP Flash Tool", desc: "MediaTek zariadenia" },
          ].map((item, i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
              <div className="mt-6 text-sm text-emerald-400">Podrobný návod →</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTIKA */}
      <section id="diagnostika" className="py-16 border-t border-zinc-800">
        <h2 className="section-title">Diagnostika problémov</h2>
        <p className="text-zinc-400 max-w-2xl mb-10">Bežné problémy, ktoré bránia načítaniu firmvéru a ako ich riešiť.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Wrench className="text-emerald-400" /> Bootloop / Brick</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Kontrola download / EDL / Fastboot módu</li>
              <li>• Test points a hard reset</li>
              <li>• Obnova cez oficiálne nástroje</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="text-emerald-400" /> Bezpečnostné upozornenie</h3>
            <p className="text-sm text-zinc-400">Vždy používaj len oficiálne alebo overené nástroje. Zálohuj dôležité dáta pred akýmkoľvek zásahom.</p>
          </div>
        </div>
      </section>

      {/* NÁSTROJE */}
      <section id="nastroje" className="py-16 border-t border-zinc-800">
        <h2 className="section-title">Nástroje a firmvér</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Fastboot", "Odin 3", "SP Flash Tool", "Mi Flash"].map((tool, i) => (
            <div key={i} className="card text-center">
              <div className="text-emerald-400 mb-3"><Download size={28} className="mx-auto" /></div>
              <div className="font-medium">{tool}</div>
              <div className="text-xs text-zinc-500 mt-1">Oficiálny zdroj</div>
            </div>
          ))}
        </div>
      </section>

      {/* BEZPEČNÉ ZDIEĽANIE – INTERAKTÍVNY NÁSTROJ */}
      <section id="zdielanie" className="py-16 border-t border-zinc-800">
        <h2 className="section-title flex items-center gap-3">
          Bezpečné zdieľanie <Shield className="text-emerald-400" />
        </h2>
        <p className="text-zinc-400 max-w-2xl mb-8">
          Interaktívny nástroj na vytvorenie password-protected ZIP archívu (AES-256) a bezpečné zdieľanie.
        </p>

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
                  onClick={() => copyToClipboard(`Pravý klik → 7-Zip → Add to archive → AES-256 + heslo: ${password}`)}
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
        Projekt je open-source. Prispieť môžeš na GitHub-e.
      </div>
    </div>
  );
}