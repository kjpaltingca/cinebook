import { card } from "../utils/ui.js";
import { calculateSummary } from "../utils/pricing.js";
import { sortSeatIds } from "../services/bookingService.js";
import { formatCurrency } from "../utils/formatters.js";
import { BOOKING_FEE_PER_TICKET } from "../constants.js";

function Row({ label, children, strong = false }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "text-base font-semibold" : "text-sm"}`}>
      <dt className={strong ? "" : "text-slate-400"}>{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

// Used on the seat page (live preview) and the review page.
export default function BookingSummary({ movie, cinema, auditorium, showtime, seatIds, reference, children }) {
  const quantity = seatIds.length;
  const { subtotal, fees, total } = calculateSummary(showtime.ticketPrice, quantity);

  return (
    <section className={`${card} p-5`} aria-label="Booking summary">
      <h2 className="text-lg font-semibold">Booking summary</h2>
      <dl className="mt-4 space-y-2.5">
        {reference && <Row label="Reference">{reference}</Row>}
        <Row label="Movie">{movie.title}</Row>
        <Row label="Cinema">
          {cinema.name}
          <span className="block text-xs text-slate-400">{cinema.location}</span>
        </Row>
        <Row label="Date and time">{showtime.getFormattedDateTime()}</Row>
        <Row label="Auditorium">{auditorium.name}</Row>
        <Row label="Seats">{quantity > 0 ? sortSeatIds(seatIds).join(", ") : "None selected"}</Row>
        <Row label="Tickets">{quantity}</Row>
        <Row label="Price per ticket">{formatCurrency(showtime.ticketPrice)}</Row>
        <Row label="Subtotal">{formatCurrency(subtotal)}</Row>
        <Row label={`Online fee (${formatCurrency(BOOKING_FEE_PER_TICKET)} per ticket)`}>{formatCurrency(fees)}</Row>
      </dl>
      <dl className="mt-4 border-t border-slate-800 pt-4">
        <Row label="Total" strong>
          {formatCurrency(total)}
        </Row>
      </dl>
      {children && <div className="mt-5 space-y-3">{children}</div>}
    </section>
  );
}
