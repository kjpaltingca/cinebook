import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import MovieCard from "../components/MovieCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { MOVIES, filterMovies, getAllGenres } from "../services/movieService.js";
import { btnPrimary } from "../utils/ui.js";

const GENRES = getAllGenres();

// Filters live in the URL (?q=&genre=&status=&sort=), so they survive back/forward
// navigation and can be linked to from the home page.
export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const genre = params.get("genre") ?? "all";
  const status = params.get("status") ?? "all";
  const sortBy = params.get("sort") ?? "title";

  const results = useMemo(
    () => filterMovies(MOVIES, { query, genre, status, sortBy }),
    [query, genre, status, sortBy]
  );

  const hasActiveFilters = query !== "" || genre !== "all" || status !== "all" || sortBy !== "title";

  function updateFilter(key, value) {
    const next = new URLSearchParams(params);
    const isDefault = value === "" || value === "all" || (key === "sort" && value === "title");
    if (isDefault) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const clearFilters = () => setParams({}, { replace: true });

  return (
    <>
      <h1 className="text-3xl font-bold">Movies</h1>
      <p className="mt-1 text-slate-400">Search the catalog and combine filters to find your next movie.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
        <div className="space-y-4">
          <SearchBar value={query} onChange={(v) => updateFilter("q", v)} />
          <FilterPanel
            filters={{ genre, status, sortBy }}
            genres={GENRES}
            onChange={updateFilter}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div>
          <p className="mb-4 text-sm text-slate-400" aria-live="polite">
            Showing {results.length} of {MOVIES.length} movies
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No movies match your search"
              message="Try a different title, or remove a filter to see more results."
            >
              <button type="button" onClick={clearFilters} className={btnPrimary}>
                Clear filters
              </button>
            </EmptyState>
          )}
        </div>
      </div>
    </>
  );
}
