// Shared constants. Documented string "enums" replace TypeScript types.

export const APP = {
  name: "CineBook",
  tagline: "Your movie night, just a few clicks away.",
  locale: "en-PH",
  currency: "PHP",
};

export const MOVIE_STATUS = Object.freeze({
  NOW_SHOWING: "NOW_SHOWING",
  COMING_SOON: "COMING_SOON",
});

export const MOVIE_STATUS_LABELS = Object.freeze({
  NOW_SHOWING: "Now Showing",
  COMING_SOON: "Coming Soon",
});

export const SEAT_TYPE = Object.freeze({
  STANDARD: "STANDARD",
  PREMIUM: "PREMIUM",
});

export const BOOKING_STATUS = Object.freeze({
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
});

export const MAX_SEATS_PER_BOOKING = 6;
export const BOOKING_FEE_PER_TICKET = 20; // PHP, shown as its own line
export const PRICE_MIN = 250; // PHP, lowest base ticket price
export const PRICE_MAX = 700; // PHP, highest base ticket price

export const STORAGE_KEYS = Object.freeze({
  BOOKINGS: "cinebook.bookings.v1",
});

export const DEMO_USER = Object.freeze({
  id: "user-demo",
  name: "Demo Moviegoer",
  email: "demo@cinebook.example",
});

export const SORT_OPTIONS = [
  { value: "title", label: "Title (A to Z)" },
  { value: "release", label: "Release date (newest)" },
  { value: "rating", label: "Rating (highest)" },
];

// Showtime generation settings (used by data/showtimes.js)
export const SHOWTIME_SLOTS = ["10:30", "13:30", "16:30", "19:30", "22:00"];
export const SCHEDULE_DAYS = 5;
