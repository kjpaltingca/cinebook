import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PosterImage from "../components/PosterImage.jsx";
import Badge from "../components/Badge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ShowtimeSelector from "../components/ShowtimeSelector.jsx";
import { CalendarIcon, ClockIcon, MapPinIcon, StarIcon } from "../components/Icons.jsx";
import {
  getAvailableShowtimesForMovie,
  getCinemaById,
  getMovieById,
} from "../services/movieService.js";
import { MOVIE_STATUS, MOVIE_STATUS_LABELS } from "../constants.js";
import { formatCurrency, formatLongDate, formatRating } from "../utils/formatters.js";
import { btnPrimary, btnSecondary, card } from "../utils/ui.js";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const movie = getMovieById(movieId);

  if (!movie) {
    return (
      <EmptyState title="Movie not found" message={`We couldn't find a movie with the id "${movieId}".`}>
        <Link to="/movies" className={btnPrimary}>
          Browse all movies
        </Link>
      </EmptyState>
    );
  }
  return <MovieDetails key={movie.id} movie={movie} />;
}

function MovieDetails({ movie }) {
  const navigate = useNavigate();
  const showtimes = useMemo(() => getAvailableShowtimesForMovie(movie.id), [movie.id]);
  const [selectedId, setSelectedId] = useState(null);
  const selected = showtimes.find((s) => s.id === selectedId) ?? showtimes[0] ?? null;

  const cinemas = [...new Set(showtimes.map((s) => s.cinemaId))].map(getCinemaById);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-slate-800">
        <PosterImage src={movie.backdropUrl} title={movie.title} showTitle={false} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-[14rem_1fr]">
          <PosterImage src={movie.posterUrl} title={movie.title} className="aspect-2/3 w-40 rounded-2xl md:w-full" />
          <div className="space-y-4">
            <Badge status={movie.status} label={MOVIE_STATUS_LABELS[movie.status]} />
            <h1 className="text-3xl font-bold sm:text-4xl">{movie.title}</h1>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-1 text-amber-300">
                <StarIcon className="h-4 w-4" /> {formatRating(movie.rating)}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" /> {movie.getFormattedDuration()}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" /> {formatLongDate(movie.releaseDate)}
              </span>
            </p>
            <p className="text-sm text-slate-300">{movie.genres.join(", ")}</p>
            <p className="max-w-2xl text-slate-200">{movie.synopsis}</p>
            <div>
              <h2 className="text-sm font-semibold">Cast</h2>
              <p className="mt-1 text-sm text-slate-300">{movie.cast.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <section className={`${card} mt-8 p-6`} aria-labelledby="showtimes-heading">
        <h2 id="showtimes-heading" className="text-xl font-semibold">
          Cinemas and showtimes
        </h2>

        {selected ? (
          <div className="mt-5 space-y-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {cinemas.map((cinema) => (
                <li key={cinema.id} className="flex gap-2 text-sm text-slate-300">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <span>
                    <span className="font-medium text-slate-100">{cinema.name}</span>
                    <br />
                    {cinema.address}
                  </span>
                </li>
              ))}
            </ul>
            <ShowtimeSelector showtimes={showtimes} selectedShowtime={selected} onSelect={(s) => setSelectedId(s.id)} />
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 pt-5">
              <p className="text-sm text-slate-300">
                Ticket price <span className="text-lg font-semibold text-slate-100">{formatCurrency(selected.ticketPrice)}</span>
              </p>
              <button type="button" onClick={() => navigate(`/booking/${selected.id}`)} className={btnPrimary}>
                Select seats
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-slate-300" role="status">
              {movie.status === MOVIE_STATUS.COMING_SOON
                ? `${movie.title} is not open for booking yet. It is expected on ${formatLongDate(movie.releaseDate)}.`
                : "There are no upcoming showtimes for this movie right now."}
            </p>
            <Link to="/movies" className={`${btnSecondary} mt-4`}>
              Browse other movies
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
