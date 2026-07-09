import type { HubContent } from "./types";
import { flashovanieCategories } from "./hu/flashovanie";
import { diagnostikaCategories } from "./hu/diagnostika";
import { nastrojeCategories } from "./hu/nastroje";
import { zdielanieSubsections } from "./hu/zdielanie";

export { flashovanieCategories, diagnostikaCategories, nastrojeCategories, zdielanieSubsections };

export const huHubContent: HubContent = {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
};