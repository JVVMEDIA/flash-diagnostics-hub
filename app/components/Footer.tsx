export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-20 py-10 text-sm text-zinc-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Flash Diagnostics Hub — Open Source projekt</p>
        <p>Legálne a bezpečné postupy • Len oficiálne zdroje</p>
      </div>
    </footer>
  );
}