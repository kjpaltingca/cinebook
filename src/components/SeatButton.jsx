import { CheckIcon, CloseIcon } from "./Icons.jsx";
import { SEAT_TYPE } from "../constants.js";
import { focusRing } from "../utils/ui.js";

// State is shown by color AND icon AND the accessible label.
export default function SeatButton({ seat, occupied, selected, onToggle }) {
  const typeLabel = seat.type === SEAT_TYPE.PREMIUM ? "premium" : "standard";
  const stateLabel = occupied ? "taken" : selected ? "selected" : "available";

  let style = "border-slate-600 bg-slate-950 text-slate-200 hover:border-violet-400";
  if (seat.type === SEAT_TYPE.PREMIUM) style = "border-sky-500/70 bg-slate-950 text-sky-200 hover:border-sky-300";
  if (selected) style = "border-violet-300 bg-violet-600 text-white";
  if (occupied) style = "cursor-not-allowed border-slate-800 bg-slate-800 text-slate-500";

  return (
    <button
      type="button"
      disabled={occupied}
      aria-pressed={selected}
      aria-label={`Seat ${seat.id}, ${typeLabel}, ${stateLabel}`}
      onClick={() => onToggle(seat.id)}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-medium transition ${focusRing} ${style}`}
    >
      {occupied ? <CloseIcon className="h-4 w-4" /> : selected ? <CheckIcon className="h-4 w-4" /> : seat.number}
    </button>
  );
}
