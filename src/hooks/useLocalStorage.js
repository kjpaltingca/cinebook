import { useEffect, useState } from "react";
import { readJSON, removeItem, writeJSON } from "../services/storageService.js";

// Like useState, but the value is saved to localStorage.
// fromStored: turns stored JSON back into app values (may throw on bad data).
// toStored: turns app values into plain JSON.
export default function useLocalStorage(key, initialValue, { fromStored, toStored }) {
  const load = () => {
    const raw = readJSON(key);
    if (raw === null) return initialValue;
    try {
      return fromStored(raw);
    } catch {
      removeItem(key); // corrupted data: start fresh instead of crashing
      return initialValue;
    }
  };

  const [value, setValue] = useState(load);

  useEffect(() => {
    writeJSON(key, toStored(value));
  }, [key, value, toStored]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === key) setValue(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
