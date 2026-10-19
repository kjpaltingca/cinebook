import { Link } from "react-router-dom";
import { ABOUT_FEATURES, DEMO_NOTICE, PRICING_NOTE } from "../data/siteContent.js";
import { APP } from "../constants.js";
import { btnPrimary, card } from "../utils/ui.js";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">About {APP.name}</h1>
      <p className="mt-3 text-lg text-slate-300">
        {APP.name} is a movie ticket booking concept. {APP.tagline}
      </p>

      <h2 className="mt-10 text-xl font-semibold">What you can do</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {ABOUT_FEATURES.map((feature) => (
          <li key={feature.title} className={`${card} p-4`}>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{feature.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Pricing</h2>
      <p className="mt-2 text-slate-300">{PRICING_NOTE}</p>

      <section className="mt-10 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5" aria-label="Project notice">
        <h2 className="text-lg font-semibold text-amber-200">Academic project</h2>
        <p className="mt-2 text-sm text-amber-100">{DEMO_NOTICE}</p>
      </section>

      <Link to="/movies" className={`${btnPrimary} mt-8`}>
        Explore movies
      </Link>
    </div>
  );
}
