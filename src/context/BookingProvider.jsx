import { useCallback, useMemo } from "react";
import { BookingContext } from "./bookingContext.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import User from "../models/User.js";
import { DEMO_USER, STORAGE_KEYS } from "../constants.js";
import { reviveBookings, serializeBookings } from "../services/storageService.js";
import { cancelledCopy, createConfirmedBooking } from "../services/bookingService.js";

const STORAGE_OPTIONS = { fromStored: reviveBookings, toStored: serializeBookings };

export default function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage(STORAGE_KEYS.BOOKINGS, [], STORAGE_OPTIONS);

  const user = useMemo(
    () => new User({ ...DEMO_USER, bookingIds: bookings.map((b) => b.id) }),
    [bookings]
  );

  // Returns { ok: true, booking } or { ok: false, error }.
  const confirmBooking = useCallback(
    ({ showtime, seatIds, reference }) => {
      const result = createConfirmedBooking({ showtime, seatIds, bookings, reference });
      if (result.ok) setBookings((prev) => [result.booking, ...prev]);
      return result;
    },
    [bookings, setBookings]
  );

  const cancelBooking = useCallback(
    (bookingId) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId && b.isConfirmed() ? cancelledCopy(b) : b))
      );
    },
    [setBookings]
  );

  const getBookingById = useCallback(
    (bookingId) => bookings.find((b) => b.id === bookingId) ?? null,
    [bookings]
  );

  const value = useMemo(
    () => ({ user, bookings, confirmBooking, cancelBooking, getBookingById }),
    [user, bookings, confirmBooking, cancelBooking, getBookingById]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
