import { BOOKING_STATUS, MOVIE_STATUS } from "../constants.js";

const TONES = {
  [MOVIE_STATUS.NOW_SHOWING]: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  [MOVIE_STATUS.COMING_SOON]: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  [BOOKING_STATUS.CONFIRMED]: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  [BOOKING_STATUS.CANCELLED]: "border-red-500/40 bg-red-500/10 text-red-300",
  [BOOKING_STATUS.PENDING]: "border-amber-500/40 bg-amber-500/10 text-amber-300",
};

export default function Badge({ status, label }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[status] ?? ""}`}
    >
      {label}
    </span>
  );
}
