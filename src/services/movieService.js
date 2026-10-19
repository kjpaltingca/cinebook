import Movie from "../models/Movie.js";
import { MOVIE_DATA } from "../data/movies.js";
import { CINEMAS } from "../data/cinemas.js";
import { AUDITORIUMS } from "../data/auditoriums.js";
import { SHOWTIMES } from "../data/showtimes.js";
import { MOVIE_STATUS } from "../constants.js";

// Movie.showtimeIds is derived from the showtime data, so it is never typed by hand.
export const MOVIES = MOVIE_DATA.map(
  (data) =>
    new Movie({
      ...data,
      showtimeIds: SHOWTIMES.filter((s) => s.movieId === data.id).map((s) => s.id),
    })
);

export const getAllMovies = () => MOVIES;
export const getMovieById = (id) => MOVIES.find((m) => m.id === id) ?? null;
export const getCinemaById = (id) => CINEMAS.find((c) => c.id === id) ?? null;
export const getAuditoriumById = (id) => AUDITORIUMS.find((a) => a.id === id) ?? null;
export const getShowtimeById = (id) => SHOWTIMES.find((s) => s.id === id) ?? null;

export function getAvailableShowtimesForMovie(movieId, now = new Date()) {
  return SHOWTIMES.filter((s) => s.movieId === movieId && s.isAvailable(now));
}

export const getNowShowingMovies = () =>
  MOVIES.filter((m) => m.status === MOVIE_STATUS.NOW_SHOWING);
export const getComingSoonMovies = () =>
  MOVIES.filter((m) => m.status === MOVIE_STATUS.COMING_SOON);

export function getPopularMovies(limit = 4) {
  return [...getNowShowingMovies()]
    .sort((a, b) => b.fameScore * b.rating - a.fameScore * a.rating)
    .slice(0, limit);
}

export function getFeaturedMovie() {
  return getPopularMovies(1)[0];
}

export function getAllGenres() {
  return [...new Set(MOVIES.flatMap((m) => m.genres))].sort();
}

export function sortMovies(movies, sortBy) {
  const copy = [...movies];
  if (sortBy === "release") {
    copy.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  } else if (sortBy === "rating") {
    copy.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));
  } else {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  return copy;
}

// Search + genre + status + sort all work together.
export function filterMovies(movies, { query = "", genre = "all", status = "all", sortBy = "title" }) {
  const q = query.trim().toLowerCase();
  const matches = movies.filter(
    (m) =>
      (q === "" || m.title.toLowerCase().includes(q)) &&
      (genre === "all" || m.genres.includes(genre)) &&
      (status === "all" || m.status === status)
  );
  return sortMovies(matches, sortBy);
}
