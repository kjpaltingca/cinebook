import { Link } from "react-router-dom";
import { NAV_LINKS } from "../data/navigation.js";
import { FOOTER_NOTICE } from "../data/siteContent.js";
import { APP } from "../constants.js";
import { focusRing } from "../utils/ui.js";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2">
        <div>
          <p className="text-lg font-bold">{APP.name}</p>
          <p className="mt-1 text-sm text-slate-400">{APP.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={`text-sm text-slate-300 hover:text-violet-300 ${focusRing}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-slate-500 sm:col-span-2">{FOOTER_NOTICE}</p>
      </div>
    </footer>
  );
}
