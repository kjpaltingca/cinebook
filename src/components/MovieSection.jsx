import { Link } from "react-router-dom";
import MovieCard from "./MovieCard.jsx";
import { focusRing } from "../utils/ui.js";

export default function MovieSection({ title, subtitle, movies, linkTo, linkLabel }) {
  return (
    <section className="mt-14">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        {linkTo && (
          <Link to={linkTo} className={`text-sm font-medium text-violet-300 hover:text-violet-200 ${focusRing}`}>
            {linkLabel}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
