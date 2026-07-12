/** Synchronný script v <head> — perf-lite pred prvým paintom na mobile/in-app */
export default function PerfLiteBootstrap() {
  const script = `(function(){try{var m=window.matchMedia("(max-width:768px)");var u=navigator.userAgent;var c=navigator.connection;var lite=m.matches||/FBAN|FBAV|Instagram|Messenger|MicroMessenger|Line\\/|Twitter|LinkedInApp/i.test(u)||(c&&c.saveData);if(lite)document.documentElement.classList.add("perf-lite");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}