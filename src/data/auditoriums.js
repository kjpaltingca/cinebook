import Auditorium from "../models/Auditorium.js";

// Three auditoriums per cinema. Seats are generated from rows x seatsPerRow.
export const AUDITORIUMS = [
  new Auditorium({ id: "cebu-a1", cinemaId: "cinebook-cebu", name: "Auditorium 1", rows: 8, seatsPerRow: 10 }),
  new Auditorium({ id: "cebu-a2", cinemaId: "cinebook-cebu", name: "Auditorium 2", rows: 7, seatsPerRow: 12 }),
  new Auditorium({ id: "cebu-a3", cinemaId: "cinebook-cebu", name: "Auditorium 3", rows: 6, seatsPerRow: 10 }),
  new Auditorium({ id: "mandaue-a1", cinemaId: "cinebook-mandaue", name: "Auditorium 1", rows: 8, seatsPerRow: 10 }),
  new Auditorium({ id: "mandaue-a2", cinemaId: "cinebook-mandaue", name: "Auditorium 2", rows: 7, seatsPerRow: 12 }),
  new Auditorium({ id: "mandaue-a3", cinemaId: "cinebook-mandaue", name: "Auditorium 3", rows: 6, seatsPerRow: 10 }),
  new Auditorium({ id: "lapu-a1", cinemaId: "cinebook-lapu", name: "Auditorium 1", rows: 8, seatsPerRow: 10 }),
  new Auditorium({ id: "lapu-a2", cinemaId: "cinebook-lapu", name: "Auditorium 2", rows: 7, seatsPerRow: 12 }),
  new Auditorium({ id: "lapu-a3", cinemaId: "cinebook-lapu", name: "Auditorium 3", rows: 6, seatsPerRow: 10 }),
];
