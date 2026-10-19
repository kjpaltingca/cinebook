import Booking from "../models/Booking.js";
import { BOOKING_STATUS } from "../constants.js";

export function readJSON(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null; // corrupted JSON or storage blocked
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // storage full or blocked
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function isValidStoredBooking(b) {
  return (
    b !== null &&
    typeof b === "object" &&
    typeof b.id === "string" &&
    typeof b.bookingReference === "string" &&
    typeof b.movieId === "string" &&
    typeof b.cinemaId === "string" &&
    typeof b.showtimeId === "string" &&
    Array.isArray(b.selectedSeatIds) &&
    b.selectedSeatIds.every((s) => typeof s === "string") &&
    typeof b.totalPrice === "number" &&
    Object.values(BOOKING_STATUS).includes(b.status)
  );
}

// Turns stored plain objects back into Booking instances. Bad entries are dropped.
export function reviveBookings(raw) {
  if (!Array.isArray(raw)) throw new Error("Stored bookings are not a list.");
  return raw.filter(isValidStoredBooking).map(Booking.fromJSON);
}

export function serializeBookings(bookings) {
  return bookings.map((b) => b.toJSON());
}
