import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import ShowtimeSelector from "../components/ShowtimeSelector.jsx";
import SeatMap from "../components/SeatMap.jsx";
import BookingSummary from "../components/BookingSummary.jsx";
import useBookings from "../hooks/useBookings.js";
import {
  getAuditoriumById,
  getAvailableShowtimesForMovie,
  getCinemaById,
  getMovieById,
  getShowtimeById,
} from "../services/movieService.js";
import { getOccupiedSeatIds, validateSeatSelection } from "../services/bookingService.js";
import { MAX_SEATS_PER_BOOKING } from "../constants.js";
import { btnPrimary } from "../utils/ui.js";

export default function BookingPage() {
  const { showtimeId } = useParams();
  const showtime = getShowtimeById(showtimeId);

  if (!showtime) {
    return (
      <EmptyState title="Showtime not found" message="This showtime does not exist or the link is out of date.">
        <Link to="/movies" className={btnPrimary}>
          Browse movies
        </Link>
      </EmptyState>
    );
  }
  if (!showtime.isAvailable()) {
    return (
      <EmptyState title="This showtime has started" message="Booking closes when a showtime begins. Pick another time.">
        <Link to={`/movies/${showtime.movieId}`} className={btnPrimary}>
          Choose another showtime
        </Link>
      </EmptyState>
    );
  }
  // key = showtime id, so the seat selection resets whenever the showtime changes.
  return <SeatSelection key={showtime.id} showtime={showtime} />;
}

function SeatSelection({ showtime }) {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState("");

  const movie = getMovieById(showtime.movieId);
  const cinema = getCinemaById(showtime.cinemaId);
  const auditorium = getAuditoriumById(showtime.auditoriumId);
  const allShowtimes = useMemo(() => getAvailableShowtimesForMovie(movie.id), [movie.id]);
  const occupiedIds = useMemo(() => getOccupiedSeatIds(showtime, bookings), [showtime, bookings]);

  function handleToggle(seatId) {
    if (occupiedIds.has(seatId)) {
      setMessage(`Seat ${seatId} is already taken.`);
      return;
    }
    if (selectedIds.includes(seatId)) {
      setSelectedIds(selectedIds.filter((id) => id !== seatId));
      setMessage("");
      return;
    }
    if (selectedIds.length >= MAX_SEATS_PER_BOOKING) {
      setMessage(`You can select up to ${MAX_SEATS_PER_BOOKING} seats per booking.`);
      return;
    }
    setSelectedIds([...selectedIds, seatId]);
    setMessage("");
  }

  function handleContinue() {
    const check = validateSeatSelection(showtime, selectedIds, bookings);
    if (!check.valid) {
      setMessage(check.error);
      return;
    }
    navigate(`/booking/${showtime.id}/review`, { state: { seatIds: selectedIds } });
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Choose your seats</h1>
      <p className="mt-1 text-slate-400">{movie.title}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <ShowtimeSelector
              showtimes={allShowtimes}
              selectedShowtime={showtime}
              onSelect={(s) => navigate(`/booking/${s.id}`)}
            />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5" aria-label="Seat selection">
            <SeatMap
              seats={auditorium.getSeats()}
              occupiedIds={occupiedIds}
              selectedIds={selectedIds}
              onToggle={handleToggle}
            />
            <p className="mt-4 text-center text-sm text-slate-400">
              {selectedIds.length} of {MAX_SEATS_PER_BOOKING} seats selected
            </p>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookingSummary
            movie={movie}
            cinema={cinema}
            auditorium={auditorium}
            showtime={showtime}
            seatIds={selectedIds}
          >
            <p role="alert" className="min-h-5 text-sm text-amber-300">
              {message}
            </p>
            <button
              type="button"
              onClick={handleContinue}
              disabled={selectedIds.length === 0}
              className={`${btnPrimary} w-full`}
            >
              Review booking
            </button>
          </BookingSummary>
        </div>
      </div>
    </>
  );
}
