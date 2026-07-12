"use client";

import dynamic from "next/dynamic";
import { Shield, Wrench } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import CategorySection from "./CategorySection";
import ComplianceNotice from "./ComplianceNotice";
import SectionHeader from "./SectionHeader";
import SeoFaq from "./SeoFaq";
import ToolsShowcase from "./ToolsShowcase";
import SubsectionCard from "./SubsectionCard";
import ScrollParallax from "./motion/ScrollParallax";
import ScrollReveal from "./motion/ScrollReveal";
import { getHubContent } from "../data/hub-content";
import type { Locale } from "../../i18n/routing";

const SharingPasswordTool = dynamic(() => import("./SharingPasswordTool"), {
  loading: () => (
    <div className="card-interactive max-w-2xl h-48 animate-pulse bg-zinc-900/40 rounded-2xl" aria-hidden />
  ),
});

export default function HubBelowFold() {
  const locale = useLocale() as Locale;
  const tSections = useTranslations("sections");
  const tContribute = useTranslations("contribute");

  const { flashovanieCategories, diagnostikaCategories, nastrojeCategories, zdielanieSubsections } =
    getHubContent(locale);

  return (
    <>
      <ToolsShowcase />

      <ScrollParallax y={[40, -40]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="flashovanie" aria-labelledby="flashovanie-heading">
          <SectionHeader
            id="flashovanie-heading"
            title={tSections("flashovanie.title")}
            description={tSections("flashovanie.description")}
          />

          <div className="space-y-6">
            {flashovanieCategories.map((category, index) => (
              <CategorySection key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>
      </ScrollParallax>

      <ScrollParallax y={[50, -50]} opacity={[0.4, 1, 1, 0.4]} className="py-16 border-t border-zinc-800/80 scroll-mt-24">
        <section id="diagnostika" aria-labelledby="diagnostika-heading">
          <SectionHeader
            id="diagnostika-heading"
            title={
              <>
                {tSections("diagnostika.title")}
                <Wrench className="text-emerald-400 shrink-0" aria-hidden />
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
            <div className="card-interactive mt-8 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="text-emerald-400" size={18} aria-hidden />
                {tSections("safetyWarning.title")}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {tSections("safetyWarning.text")}
              </p>
            </div>
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
            <SharingPasswordTool />
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
    </>
  );
}