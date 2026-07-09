/** Scroll progress — čisto CSS (scroll-driven), bez forced reflow */
export default function ScrollProgress() {
  return (
    <div
      className="scroll-progress-bar fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300"
      aria-hidden
    />
  );
}