import SeatButton from "./SeatButton.jsx";
import { CheckIcon, CloseIcon } from "./Icons.jsx";

function Legend() {
  const box = "flex h-6 w-6 items-center justify-center rounded-md border";
  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-300" aria-label="Seat legend">
      <li className="flex items-center gap-2">
        <span className={`${box} border-slate-600 bg-slate-950`} /> Available
      </li>
      <li className="flex items-center gap-2">
        <span className={`${box} border-sky-500/70 bg-slate-950`} /> Premium
      </li>
      <li className="flex items-center gap-2">
        <span className={`${box} border-violet-300 bg-violet-600 text-white`}>
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        Selected
      </li>
      <li className="flex items-center gap-2">
        <span className={`${box} border-slate-800 bg-slate-800 text-slate-500`}>
          <CloseIcon className="h-3.5 w-3.5" />
        </span>
        Taken
      </li>
    </ul>
  );
}

export default function SeatMap({ seats, occupiedIds, selectedIds, onToggle }) {
  const rows = new Map();
  seats.forEach((seat) => {
    if (!rows.has(seat.row)) rows.set(seat.row, []);
    rows.get(seat.row).push(seat);
  });

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="mx-auto w-max min-w-full px-2">
          <div className="mx-auto mb-8 h-2 w-3/4 rounded-full bg-linear-to-r from-violet-500 via-sky-400 to-violet-500" />
          <p className="-mt-6 mb-6 text-center text-xs text-slate-400">Screen</p>
          <div role="group" aria-label="Seat map" className="space-y-1.5">
            {[...rows.entries()].map(([row, rowSeats]) => (
              <div key={row} className="flex items-center justify-center gap-1.5">
                <span className="w-5 text-center text-xs text-slate-500" aria-hidden="true">
                  {row}
                </span>
                {rowSeats.map((seat, index) => (
                  <div key={seat.id} className={index === rowSeats.length / 2 ? "ml-4" : ""}>
                    <SeatButton
                      seat={seat}
                      occupied={occupiedIds.has(seat.id)}
                      selected={selectedIds.includes(seat.id)}
                      onToggle={onToggle}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Legend />
    </div>
  );
}
