// Shared Tailwind class strings, so every button/card/input looks the same.
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400";

const btnBase = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

export const btnPrimary = `${btnBase} bg-violet-600 text-white hover:bg-violet-500`;
export const btnSecondary = `${btnBase} border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800`;
export const btnDanger = `${btnBase} border border-red-500/50 bg-red-500/10 text-red-300 hover:bg-red-500/20`;

export const card = "rounded-2xl border border-slate-800 bg-slate-900";

export const inputBase = `min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 placeholder:text-slate-500 ${focusRing}`;
