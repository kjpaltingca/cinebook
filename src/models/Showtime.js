import { formatDate, formatTime } from "../utils/formatters.js";

export default class Showtime {
  constructor({
    id,
    movieId,
    cinemaId,
    auditoriumId,
    date,
    startTime,
    ticketPrice,
    seatIds,
    occupiedSeatIds = [],
  }) {
    this.id = id;
    this.movieId = movieId;
    this.cinemaId = cinemaId;
    this.auditoriumId = auditoriumId;
    this.date = date; // "YYYY-MM-DD"
    this.startTime = startTime; // "HH:mm" (24h)
    this.ticketPrice = ticketPrice;
    this.seatIds = seatIds;
    this.occupiedSeatIds = occupiedSeatIds; // demo seed data
  }

  getStartDate() {
    const [y, m, d] = this.date.split("-").map(Number);
    const [hh, mm] = this.startTime.split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  }

  // A showtime can be booked only before it starts.
  isAvailable(now = new Date()) {
    return this.getStartDate() > now;
  }

  getFormattedDateTime() {
    return `${formatDate(this.date)}, ${formatTime(this.startTime)}`;
  }
}
