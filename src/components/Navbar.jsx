import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CloseIcon, MenuIcon, TicketIcon } from "./Icons.jsx";
import { NAV_LINKS } from "../data/navigation.js";
import { APP } from "../constants.js";
import { focusRing } from "../utils/ui.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium ${focusRing} ${
      isActive ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className={`flex items-center gap-2 rounded-lg text-xl font-bold ${focusRing}`}>
          <TicketIcon className="h-6 w-6 text-violet-400" />
          <span>{APP.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-slate-800 md:hidden ${focusRing}`}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 border-t border-slate-800 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
