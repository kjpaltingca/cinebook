import { Link } from "react-router-dom";
import PosterImage from "./PosterImage.jsx";
import Badge from "./Badge.jsx";
import { ClockIcon, StarIcon } from "./Icons.jsx";
import { MOVIE_STATUS_LABELS } from "../constants.js";
import { formatCurrency, formatRating } from "../utils/formatters.js";
import { btnPrimary, btnSecondary, card, focusRing } from "../utils/ui.js";

export default function MovieCard({ movie }) {
  const bookable = movie.isBookable();
  return (
    <article className={`${card} group flex flex-col overflow-hidden transition hover:border-violet-500/60`}>
      <Link to={`/movies/${movie.id}`} tabIndex={-1} aria-hidden="true" className="block">
        <PosterImage src={movie.posterUrl} title={movie.title} className="aspect-2/3 w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge status={movie.status} label={MOVIE_STATUS_LABELS[movie.status]} />
          <span className="flex items-center gap-1 text-sm text-amber-300">
            <StarIcon className="h-4 w-4" />
            <span className="sr-only">Rating:</span>
            {formatRating(movie.rating)}
          </span>
        </div>
        <h3 className="font-semibold leading-snug">
          <Link to={`/movies/${movie.id}`} className={`hover:text-violet-300 ${focusRing}`}>
            {movie.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-400">{movie.genres.join(", ")}</p>
        <p className="flex items-center gap-1.5 text-sm text-slate-400">
          <ClockIcon className="h-4 w-4" />
          {movie.getFormattedDuration()}
          {bookable && <span className="ml-auto text-slate-200">From {formatCurrency(movie.getBasePrice())}</span>}
        </p>
        <Link
          to={`/movies/${movie.id}`}
          className={`${bookable ? btnPrimary : btnSecondary} mt-auto w-full`}
        >
          {bookable ? "Book tickets" : "View details"}
        </Link>
      </div>
    </article>
  );
}
