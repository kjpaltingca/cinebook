import Showtime from "../models/Showtime.js";
import { MOVIE_DATA } from "./movies.js";
import { CINEMAS } from "./cinemas.js";
import { AUDITORIUMS } from "./auditoriums.js";
import { MOVIE_STATUS, SCHEDULE_DAYS, SHOWTIME_SLOTS } from "../constants.js";
import { calculateBasePrice } from "../utils/pricing.js";
import { toISODate } from "../utils/formatters.js";

// FICTIONAL schedule generated from today's date, so there are always upcoming
// showtimes. The same input always produces the same output on a given day.

// FNV-1a hash: turns text into a stable number (used to seed occupied seats).
function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seedOccupiedSeats(showtimeId, seatIds) {
  const occupancy = 15 + (hash(showtimeId) % 40); // 15% to 54% of seats taken
  return seatIds.filter((seatId) => hash(`${showtimeId}:${seatId}`) % 100 < occupancy);
}

// Every cinema has (auditoriums x time slots) "cells" per day. Each movie playing at a
// cinema gets two cells that never overlap with another movie, and the pattern rotates daily.
function buildShowtimes() {
  const list = [];
  const today = new Date();
  const nowShowing = MOVIE_DATA.filter((m) => m.status === MOVIE_STATUS.NOW_SHOWING);

  // Which movies play at which cinema (each movie plays at two cinemas).
  const moviesByCinema = new Map(CINEMAS.map((c) => [c.id, []]));
  nowShowing.forEach((movie, movieIndex) => {
    [0, 1].forEach((offset) => {
      moviesByCinema.get(CINEMAS[(movieIndex + offset) % CINEMAS.length].id).push(movie);
    });
  });

  CINEMAS.forEach((cinema) => {
    const auditoriumCount = cinema.auditoriumIds.length;
    const totalCells = SHOWTIME_SLOTS.length * auditoriumCount;
    const half = Math.ceil(totalCells / 2);

    for (let day = 0; day < SCHEDULE_DAYS; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + day);
      const isoDate = toISODate(date);
      const usedCells = new Set();

      moviesByCinema.get(cinema.id).forEach((movie, i) => {
        [i, i + half].forEach((baseCell) => {
          if (baseCell >= totalCells) return;
          const cell = (baseCell + day * 4) % totalCells;
          if (usedCells.has(cell)) return;
          usedCells.add(cell);

          const startTime = SHOWTIME_SLOTS[Math.floor(cell / auditoriumCount)];
          const auditorium = AUDITORIUMS.find((a) => a.id === cinema.auditoriumIds[cell % auditoriumCount]);
          const id = `st-${movie.id}-${cinema.id}-${isoDate}-${startTime.replace(":", "")}`;
          list.push(
            new Showtime({
              id,
              movieId: movie.id,
              cinemaId: cinema.id,
              auditoriumId: auditorium.id,
              date: isoDate,
              startTime,
              ticketPrice: calculateBasePrice(movie),
              seatIds: auditorium.seatIds,
              occupiedSeatIds: seedOccupiedSeats(id, auditorium.seatIds),
            })
          );
        });
      });
    }
  });

  return list.sort((a, b) => a.getStartDate() - b.getStartDate());
}

export const SHOWTIMES = buildShowtimes();
