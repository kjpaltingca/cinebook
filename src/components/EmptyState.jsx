import { card } from "../utils/ui.js";

export default function EmptyState({ title, message, children }) {
  return (
    <section className={`${card} mx-auto max-w-lg p-8 text-center`} role="status">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-400">{message}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </section>
  );
}
