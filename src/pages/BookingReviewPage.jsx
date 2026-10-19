import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import BookingSummary from "../components/BookingSummary.jsx";
import useBookings from "../hooks/useBookings.js";
import Booking from "../models/Booking.js";
import {
  getAuditoriumById,
  getCinemaById,
  getMovieById,
  getShowtimeById,
} from "../services/movieService.js";
import { validateSeatSelection } from "../services/bookingService.js";
import { btnPrimary, btnSecondary } from "../utils/ui.js";

export default function BookingReviewPage() {
  const { showtimeId } = useParams();
  const { state } = useLocation();
  const showtime = getShowtimeById(showtimeId);
  const seatIds = state?.seatIds;

  if (!showtime) {
    return (
      <EmptyState title="Showtime not found" message="This showtime does not exist.">
        <Link to="/movies" className={btnPrimary}>
          Browse movies
        </Link>
      </EmptyState>
    );
  }
  // Opened directly (no seats chosen)? Send the user back to pick seats.
  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    return <Navigate to={`/booking/${showtimeId}`} replace />;
  }
  return <Review showtime={showtime} seatIds={seatIds} />;
}

function Review({ showtime, seatIds }) {
  const navigate = useNavigate();
  const { bookings, confirmBooking } = useBookings();
  const [error, setError] = useState("");
  const [reference] = useState(() =>
    Booking.generateReference(new Set(bookings.map((b) => b.bookingReference)))
  );

  const movie = getMovieById(showtime.movieId);
  const cinema = getCinemaById(showtime.cinemaId);
  const auditorium = getAuditoriumById(showtime.auditoriumId);
  const check = validateSeatSelection(showtime, seatIds, bookings);

  function handleConfirm() {
    const result = confirmBooking({ showtime, seatIds, reference });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(`/confirmation/${result.booking.id}`, { replace: true });
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold">Review your booking</h1>
      <p className="mt-1 text-slate-400">Check the details, then confirm.</p>

      <p className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
        Simulated booking: no real tickets are issued and no payment is taken.
      </p>

      <div className="mt-6">
        <BookingSummary
          movie={movie}
          cinema={cinema}
          auditorium={auditorium}
          showtime={showtime}
          seatIds={seatIds}
          reference={reference}
        >
          {!check.valid && (
            <p role="alert" className="text-sm text-red-300">
              {check.error}
            </p>
          )}
          {error && check.valid && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <button type="button" onClick={handleConfirm} disabled={!check.valid} className={`${btnPrimary} w-full`}>
            Confirm booking
          </button>
          <button
            type="button"
            onClick={() => navigate(`/booking/${showtime.id}`)}
            className={`${btnSecondary} w-full`}
          >
            Go back and change seats
          </button>
        </BookingSummary>
      </div>
    </div>
  );
}
