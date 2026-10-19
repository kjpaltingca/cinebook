import PosterImage from "./PosterImage.jsx";
import Badge from "./Badge.jsx";
import { getBookingDetails, sortSeatIds } from "../services/bookingService.js";
import { formatCreatedAt, formatCurrency, formatDate, formatTime } from "../utils/formatters.js";
import { card } from "../utils/ui.js";

// Shows one saved booking. Uses the booking's own snapshot for date and time,
// so it still works if the demo schedule changes on a later day.
export default function BookingTicket({ booking, children }) {
  const { movie, cinema, auditorium } = getBookingDetails(booking);
  const when = `${formatDate(booking.showDate)}, ${formatTime(booking.startTime)}`;

  const rows = [
    ["Cinema", cinema ? `${cinema.name}, ${cinema.location}` : "Cinema no longer in demo data"],
    ["Date and time", when],
    ["Auditorium", auditorium ? auditorium.name : "Not available"],
    ["Seats", sortSeatIds(booking.selectedSeatIds).join(", ")],
    ["Tickets", `${booking.ticketQuantity} × ${formatCurrency(booking.subtotal / booking.ticketQuantity)}`],
    ["Online fee", formatCurrency(booking.fees)],
    ["Booked on", formatCreatedAt(booking.createdAt)],
  ];

  return (
    <article className={`${card} flex flex-col overflow-hidden sm:flex-row`}>
      <PosterImage
        src={movie?.posterUrl}
        title={movie?.title ?? "Unknown movie"}
        className="h-48 w-full sm:h-auto sm:w-40 sm:shrink-0"
        showTitle={false}
      />
      <div className="flex-1 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{movie?.title ?? "Unknown movie"}</h3>
            <p className="text-sm text-slate-400">
              Reference <span className="font-mono text-slate-200">{booking.bookingReference}</span>
            </p>
          </div>
          <Badge status={booking.status} label={booking.status === "CONFIRMED" ? "Confirmed" : "Cancelled"} />
        </div>
        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-slate-400">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-lg font-semibold">Total {formatCurrency(booking.totalPrice)}</p>
        {children && <div className="mt-4 flex flex-wrap gap-3">{children}</div>}
      </div>
    </article>
  );
}
