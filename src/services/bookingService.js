import Booking from "../models/Booking.js";
import { BOOKING_STATUS, MAX_SEATS_PER_BOOKING } from "../constants.js";
import {
  getAuditoriumById,
  getCinemaById,
  getMovieById,
  getShowtimeById,
} from "./movieService.js";

// Occupied = demo seed seats + seats of CONFIRMED bookings for that showtime.
// Cancelling a booking removes it from the second group, so seats free up by themselves.
export function getOccupiedSeatIds(showtime, bookings) {
  const occupied = new Set(showtime.occupiedSeatIds);
  bookings.forEach((b) => {
    if (b.showtimeId === showtime.id && b.status === BOOKING_STATUS.CONFIRMED) {
      b.selectedSeatIds.forEach((id) => occupied.add(id));
    }
  });
  return occupied;
}

export function sortSeatIds(seatIds) {
  return [...seatIds].sort((a, b) => {
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
    return Number(a.slice(1)) - Number(b.slice(1));
  });
}

// The single source of truth for "is this seat selection allowed?".
// It runs again on the review page and again at confirmation time.
export function validateSeatSelection(showtime, seatIds, bookings) {
  if (!showtime) return { valid: false, error: "This showtime could not be found." };
  if (!showtime.isAvailable()) return { valid: false, error: "This showtime has already started." };
  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    return { valid: false, error: "Select at least one seat to continue." };
  }
  if (seatIds.length > MAX_SEATS_PER_BOOKING) {
    return { valid: false, error: `You can book at most ${MAX_SEATS_PER_BOOKING} seats.` };
  }
  if (new Set(seatIds).size !== seatIds.length) {
    return { valid: false, error: "Each seat can only be selected once." };
  }
  const known = new Set(showtime.seatIds);
  if (seatIds.some((id) => !known.has(id))) {
    return { valid: false, error: "One of the selected seats does not exist in this auditorium." };
  }
  const occupied = getOccupiedSeatIds(showtime, bookings);
  const taken = seatIds.filter((id) => occupied.has(id));
  if (taken.length > 0) {
    return { valid: false, error: `Seat ${taken.join(", ")} is no longer available.` };
  }
  return { valid: true, error: null };
}

// Validates, then builds a CONFIRMED booking. Never saves anything itself.
export function createConfirmedBooking({ showtime, seatIds, bookings, reference }) {
  const check = validateSeatSelection(showtime, seatIds, bookings);
  if (!check.valid) return { ok: false, error: check.error };

  const usedReferences = new Set(bookings.map((b) => b.bookingReference));
  const bookingReference =
    reference && !usedReferences.has(reference) ? reference : Booking.generateReference(usedReferences);

  const booking = new Booking({
    id: Booking.generateId(),
    bookingReference,
    movieId: showtime.movieId,
    cinemaId: showtime.cinemaId,
    showtimeId: showtime.id,
    showDate: showtime.date,
    startTime: showtime.startTime,
    selectedSeatIds: sortSeatIds(seatIds),
  });
  booking.calculateSubtotal(showtime.ticketPrice);
  booking.calculateTotal();
  booking.confirm();
  return { ok: true, booking };
}

// Returns a cancelled copy (React state should never be mutated in place).
export function cancelledCopy(booking) {
  const copy = Booking.fromJSON(booking.toJSON());
  copy.cancel();
  return copy;
}

// Looks up everything a ticket needs to display. Parts can be null if the demo
// schedule changed since the booking was made; the booking snapshot still works.
export function getBookingDetails(booking) {
  const showtime = getShowtimeById(booking.showtimeId);
  return {
    movie: getMovieById(booking.movieId),
    cinema: getCinemaById(booking.cinemaId),
    showtime,
    auditorium: showtime ? getAuditoriumById(showtime.auditoriumId) : null,
  };
}
