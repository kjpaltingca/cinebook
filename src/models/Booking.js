import { BOOKING_STATUS } from "../constants.js";
import { calculateFees } from "../utils/pricing.js";

export default class Booking {
  constructor({
    id,
    bookingReference,
    movieId,
    cinemaId,
    showtimeId,
    showDate,
    startTime,
    selectedSeatIds,
    ticketQuantity = selectedSeatIds.length,
    subtotal = 0,
    fees = 0,
    totalPrice = 0,
    status = BOOKING_STATUS.PENDING,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.bookingReference = bookingReference;
    this.movieId = movieId;
    this.cinemaId = cinemaId;
    this.showtimeId = showtimeId;
    this.showDate = showDate; // snapshot, so old tickets still show their date
    this.startTime = startTime; // snapshot
    this.selectedSeatIds = selectedSeatIds;
    this.ticketQuantity = ticketQuantity;
    this.subtotal = subtotal;
    this.fees = fees;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
  }

  calculateSubtotal(ticketPrice) {
    this.subtotal = ticketPrice * this.ticketQuantity;
    this.fees = calculateFees(this.ticketQuantity);
    return this.subtotal;
  }

  calculateTotal() {
    this.totalPrice = this.subtotal + this.fees;
    return this.totalPrice;
  }

  confirm() {
    if (this.status !== BOOKING_STATUS.PENDING) {
      throw new Error("Only a pending booking can be confirmed.");
    }
    this.status = BOOKING_STATUS.CONFIRMED;
  }

  cancel() {
    if (this.status !== BOOKING_STATUS.CONFIRMED) {
      throw new Error("Only a confirmed booking can be cancelled.");
    }
    this.status = BOOKING_STATUS.CANCELLED;
  }

  isConfirmed() {
    return this.status === BOOKING_STATUS.CONFIRMED;
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(data) {
    return new Booking(data);
  }

  static generateId() {
    return `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  // Example: CB-261019-7K2QXD. Retries until it differs from every existing reference.
  static generateReference(existingReferences = new Set()) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    let reference;
    do {
      const code = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0");
      reference = `CB-${yy}${mm}${dd}-${code}`;
    } while (existingReferences.has(reference));
    return reference;
  }
}
