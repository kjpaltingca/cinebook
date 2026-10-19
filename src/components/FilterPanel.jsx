import { useId } from "react";
import { MOVIE_STATUS_LABELS, SORT_OPTIONS } from "../constants.js";
import { btnSecondary, card, focusRing, inputBase } from "../utils/ui.js";

const STATUS_CHOICES = [
  { value: "all", label: "All" },
  ...Object.entries(MOVIE_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

export default function FilterPanel({ filters, genres, onChange, onClear, hasActiveFilters }) {
  const genreId = useId();
  const sortId = useId();

  return (
    <aside aria-label="Filters" className={`${card} space-y-5 p-4`}>
      <div>
        <label htmlFor={genreId} className="mb-1.5 block text-sm font-medium">
          Genre
        </label>
        <select
          id={genreId}
          value={filters.genre}
          onChange={(e) => onChange("genre", e.target.value)}
          className={inputBase}
        >
          <option value="all">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Availability</legend>
        <div className="space-y-1">
          {STATUS_CHOICES.map((choice) => (
            <label key={choice.value} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                name="status"
                value={choice.value}
                checked={filters.status === choice.value}
                onChange={() => onChange("status", choice.value)}
                className={`h-4 w-4 accent-violet-500 ${focusRing}`}
              />
              {choice.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={sortId} className="mb-1.5 block text-sm font-medium">
          Sort by
        </label>
        <select
          id={sortId}
          value={filters.sortBy}
          onChange={(e) => onChange("sort", e.target.value)}
          className={inputBase}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={onClear} disabled={!hasActiveFilters} className={`${btnSecondary} w-full`}>
        Clear filters
      </button>
    </aside>
  );
}
