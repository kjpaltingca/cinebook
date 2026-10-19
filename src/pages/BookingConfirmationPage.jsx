import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import BookingTicket from "../components/BookingTicket.jsx";
import { CheckIcon } from "../components/Icons.jsx";
import useBookings from "../hooks/useBookings.js";
import { btnPrimary, btnSecondary } from "../utils/ui.js";

export default function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const { getBookingById } = useBookings();
  const booking = getBookingById(bookingId);

  if (!booking) {
    return (
      <EmptyState title="Booking not found" message="We couldn't find this booking. It may have been cleared from this browser.">
        <Link to="/my-tickets" className={btnPrimary}>
          Go to My Tickets
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-3xl font-bold">Booking confirmed</h1>
        <p className="mt-1 text-slate-400">Your booking reference</p>
        <p className="mt-1 font-mono text-3xl font-bold tracking-wider text-violet-300">{booking.bookingReference}</p>
      </div>

      <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-center text-sm text-amber-200">
        This is a simulated booking saved only in this browser. No real tickets were issued and no payment was taken.
      </p>

      <div className="mt-6">
        <BookingTicket booking={booking} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/my-tickets" className={btnPrimary}>
          View My Tickets
        </Link>
        <Link to="/" className={btnSecondary}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
