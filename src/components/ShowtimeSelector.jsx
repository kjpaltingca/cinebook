import { useId, useMemo } from "react";
import { getAuditoriumById, getCinemaById } from "../services/movieService.js";
import { formatDate, formatTime } from "../utils/formatters.js";
import { focusRing, inputBase } from "../utils/ui.js";

// Cinema -> date -> time. Calls onSelect(showtime) whenever the choice changes.
export default function ShowtimeSelector({ showtimes, selectedShowtime, onSelect }) {
  const cinemaSelectId = useId();
  const dateSelectId = useId();

  const cinemaIds = useMemo(() => [...new Set(showtimes.map((s) => s.cinemaId))], [showtimes]);

  if (!selectedShowtime) return null;

  const inCinema = showtimes.filter((s) => s.cinemaId === selectedShowtime.cinemaId);
  const dates = [...new Set(inCinema.map((s) => s.date))];
  const times = inCinema.filter((s) => s.date === selectedShowtime.date);

  function handleCinemaChange(cinemaId) {
    const options = showtimes.filter((s) => s.cinemaId === cinemaId);
    // Keep the same date if the new cinema has it, otherwise use its first showtime.
    onSelect(options.find((s) => s.date === selectedShowtime.date) ?? options[0]);
  }

  function handleDateChange(date) {
    onSelect(inCinema.find((s) => s.date === date));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={cinemaSelectId} className="mb-1.5 block text-sm font-medium">
            Cinema
          </label>
          <select
            id={cinemaSelectId}
            value={selectedShowtime.cinemaId}
            onChange={(e) => handleCinemaChange(e.target.value)}
            className={inputBase}
          >
            {cinemaIds.map((id) => {
              const cinema = getCinemaById(id);
              return (
                <option key={id} value={id}>
                  {cinema.name} ({cinema.location})
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor={dateSelectId} className="mb-1.5 block text-sm font-medium">
            Date
          </label>
          <select
            id={dateSelectId}
            value={selectedShowtime.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className={inputBase}
          >
            {dates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Showtime</legend>
        <div className="flex flex-wrap gap-2">
          {times.map((showtime) => {
            const selected = showtime.id === selectedShowtime.id;
            const auditorium = getAuditoriumById(showtime.auditoriumId);
            return (
              <button
                key={showtime.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(showtime)}
                className={`min-h-11 rounded-xl border px-4 py-1.5 text-left text-sm transition ${focusRing} ${
                  selected
                    ? "border-violet-400 bg-violet-600 text-white"
                    : "border-slate-700 bg-slate-950 text-slate-200 hover:border-violet-500"
                }`}
              >
                <span className="block font-semibold">{formatTime(showtime.startTime)}</span>
                <span className={`block text-xs ${selected ? "text-violet-100" : "text-slate-400"}`}>
                  {auditorium.name}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
