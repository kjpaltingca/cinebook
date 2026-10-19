import { PRICE_MAX, PRICE_MIN, BOOKING_FEE_PER_TICKET } from "../constants.js";

// Base ticket price from rating (60%) and fame (40%).
// Combined score of 5 or less = PRICE_MIN, a perfect 10 = PRICE_MAX.
export function calculateBasePrice({ rating, fameScore }) {
  const combined = 0.6 * rating + 0.4 * fameScore;
  const raw = PRICE_MIN + ((combined - 5) / 5) * (PRICE_MAX - PRICE_MIN);
  const clamped = Math.min(PRICE_MAX, Math.max(PRICE_MIN, raw));
  return Math.round(clamped / 10) * 10;
}

export function calculateFees(ticketQuantity) {
  return ticketQuantity * BOOKING_FEE_PER_TICKET;
}

export function calculateSummary(ticketPrice, ticketQuantity) {
  const subtotal = ticketPrice * ticketQuantity;
  const fees = calculateFees(ticketQuantity);
  return { subtotal, fees, total: subtotal + fees };
}
