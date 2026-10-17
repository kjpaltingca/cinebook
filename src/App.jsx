import { NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";
import { NAV_LINKS } from "./data/navigation.js";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4"
        >
          <NavLink
            to="/"
            className="text-xl font-bold text-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            CineBook
          </NavLink>
          <ul className="flex flex-wrap gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    "rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 " +
                    (isActive
                      ? "bg-violet-600 text-white"
                      : "text-slate-300 hover:bg-slate-800")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

// TEMPORARY: replaced by real pages in Phases 2 and 3.
function Stub({ title }) {
  const params = useParams();
  const entries = Object.entries(params);
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-400">Route works. Real page coming soon.</p>
      {entries.length > 0 && (
        <p className="mt-4 text-sm text-sky-400">
          Route params: {entries.map(([k, v]) => `${k} = ${v}`).join(", ")}
        </p>
      )}
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Stub title="Home" />} />
        <Route path="/movies" element={<Stub title="Movie Catalog" />} />
        <Route path="/movies/:movieId" element={<Stub title="Movie Details" />} />
        <Route path="/booking/:showtimeId" element={<Stub title="Seat Selection" />} />
        <Route path="/booking/:showtimeId/review" element={<Stub title="Booking Review" />} />
        <Route path="/confirmation/:bookingId" element={<Stub title="Booking Confirmation" />} />
        <Route path="/my-tickets" element={<Stub title="My Tickets" />} />
        <Route path="/about" element={<Stub title="About" />} />
        <Route path="*" element={<Stub title="404: Page Not Found" />} />
      </Route>
    </Routes>
  );
}