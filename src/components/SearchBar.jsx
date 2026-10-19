import { useId } from "react";
import { SearchIcon } from "./Icons.jsx";
import { inputBase } from "../utils/ui.js";

export default function SearchBar({ value, onChange }) {
  const id = useId();
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search movies by title
      </label>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies by title"
        className={`${inputBase} pl-10`}
      />
    </div>
  );
}
