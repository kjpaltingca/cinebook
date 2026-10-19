import { Link } from "react-router-dom";
import PosterImage from "../components/PosterImage.jsx";
import MovieSection from "../components/MovieSection.jsx";
import { StarIcon } from "../components/Icons.jsx";
import {
  getAllGenres,
  getAvailableShowtimesForMovie,
  getComingSoonMovies,
  getFeaturedMovie,
  getNowShowingMovies,
  getPopularMovies,
} from "../services/movieService.js";
import { APP } from "../constants.js";
import { formatRating } from "../utils/formatters.js";
import { btnPrimary, btnSecondary, focusRing } from "../utils/ui.js";

export default function HomePage() {
  const featured = getFeaturedMovie();
  const firstShowtime = getAvailableShowtimesForMovie(featured.id)[0];
  const bookLink = firstShowtime ? `/booking/${firstShowtime.id}` : `/movies/${featured.id}`;

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-slate-800">
        <PosterImage
          src={featured.backdropUrl}
          title={featured.title}
          showTitle={false}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="relative flex min-h-96 flex-col justify-end gap-4 p-6 sm:p-10 lg:min-h-112">
          <p className="text-sm font-medium text-violet-300">{APP.tagline}</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{featured.title}</h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
            <span className="flex items-center gap-1 text-amber-300">
              <StarIcon className="h-4 w-4" /> {formatRating(featured.rating)}
            </span>
            <span>{featured.getFormattedDuration()}</span>
            <span>{featured.genres.join(", ")}</span>
          </p>
          <p className="line-clamp-3 max-w-2xl text-slate-300">{featured.synopsis}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link to={bookLink} className={btnPrimary}>
              Book tickets
            </Link>
            <Link to="/movies" className={btnSecondary}>
              Explore movies
            </Link>
          </div>
        </div>
      </section>

      <MovieSection
        title="Now showing"
        subtitle="Pick a movie and reserve your seats."
        movies={getNowShowingMovies().slice(0, 8)}
        linkTo="/movies?status=NOW_SHOWING"
        linkLabel="See all now showing"
      />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Browse by genre</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {getAllGenres().map((genre) => (
            <li key={genre}>
              <Link
                to={`/movies?genre=${encodeURIComponent(genre)}`}
                className={`inline-flex min-h-11 items-center rounded-full border border-slate-700 bg-slate-900 px-4 text-sm hover:border-violet-400 hover:text-violet-300 ${focusRing}`}
              >
                {genre}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <MovieSection title="Popular right now" subtitle="Our most talked-about titles." movies={getPopularMovies(4)} />

      <MovieSection
        title="Coming soon"
        subtitle="Not open for booking yet."
        movies={getComingSoonMovies()}
        linkTo="/movies?status=COMING_SOON"
        linkLabel="See all coming soon"
      />
    </>
  );
}
