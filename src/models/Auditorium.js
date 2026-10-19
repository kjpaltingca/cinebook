import Seat from "./Seat.js";
import { SEAT_TYPE } from "../constants.js";

export default class Auditorium {
  #seats = null; // cache, built on first use

  constructor({ id, cinemaId, name, rows, seatsPerRow, premiumRows = 2 }) {
    this.id = id;
    this.cinemaId = cinemaId;
    this.name = name;
    this.rows = rows;
    this.seatsPerRow = seatsPerRow;
    this.premiumRows = premiumRows; // the last N rows are PREMIUM (label only)
    this.seatIds = [];
    for (let r = 0; r < rows; r++) {
      const letter = String.fromCharCode(65 + r);
      for (let n = 1; n <= seatsPerRow; n++) this.seatIds.push(`${letter}${n}`);
    }
  }

  getSeats() {
    if (!this.#seats) {
      this.#seats = this.seatIds.map((id) => {
        const row = id[0];
        const rowIndex = row.charCodeAt(0) - 65;
        return new Seat({
          id,
          row,
          number: Number(id.slice(1)),
          type: rowIndex >= this.rows - this.premiumRows ? SEAT_TYPE.PREMIUM : SEAT_TYPE.STANDARD,
        });
      });
    }
    return this.#seats;
  }

  getCapacity() {
    return this.rows * this.seatsPerRow;
  }
}
