import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import BookingTicket from "../components/BookingTicket.jsx";
import useBookings from "../hooks/useBookings.js";
import { btnDanger, btnPrimary, btnSecondary } from "../utils/ui.js";

function CancelControl({ booking, onCancel }) {
  const [asking, setAsking] = useState(false);
  if (!booking.isConfirmed()) return null;

  if (!asking) {
    return (
      <button type="button" onClick={() => setAsking(true)} className={btnDanger}>
        Cancel booking
      </button>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Confirm cancellation">
      <span className="text-sm text-slate-300">Cancel this booking and release the seats?</span>
      <button type="button" onClick={() => onCancel(booking.id)} className={btnDanger}>
        Yes, cancel
      </button>
      <button type="button" onClick={() => setAsking(false)} className={btnSecondary}>
        Keep booking
      </button>
    </div>
  );
}

export default function MyTicketsPage() {
  const { bookings, cancelBooking } = useBookings();
  const sorted = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <h1 className="text-3xl font-bold">My Tickets</h1>
      <p className="mt-1 text-slate-400">Simulated bookings saved in this browser.</p>

      {sorted.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No tickets yet" message="When you confirm a booking, it will appear here.">
            <Link to="/movies" className={btnPrimary}>
              Find a movie
            </Link>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {sorted.map((booking) => (
            <BookingTicket key={booking.id} booking={booking}>
              <CancelControl booking={booking} onCancel={cancelBooking} />
            </BookingTicket>
          ))}
        </div>
      )}
    </>
  );
}
