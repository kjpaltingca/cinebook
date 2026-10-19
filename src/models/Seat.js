import { SEAT_TYPE } from "../constants.js";

// A Seat is the PHYSICAL seat. Whether it is taken depends on the showtime,
// so availability is checked against a set of occupied ids.
export default class Seat {
  constructor({ id, row, number, type = SEAT_TYPE.STANDARD }) {
    this.id = id; // e.g. "A1"
    this.row = row; // e.g. "A"
    this.number = number; // e.g. 1
    this.type = type;
  }

  isAvailable(occupiedIds) {
    return !occupiedIds.has(this.id);
  }
}
