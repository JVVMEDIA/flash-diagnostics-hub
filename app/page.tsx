import HubPageContent from "./components/HubPageContent";
import JsonLd from "./components/JsonLd";
import { pageMetadata } from "./data/seo";

export const metadata = pageMetadata;

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HubPageContent />
    </>
  );
}