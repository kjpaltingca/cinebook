import { useState } from "react";
import { FilmIcon } from "./Icons.jsx";

// Placeholder gradients (full class names so Tailwind can find them).
const GRADIENTS = [
  "from-violet-700 to-slate-900",
  "from-sky-700 to-slate-900",
  "from-fuchsia-700 to-slate-900",
  "from-indigo-700 to-slate-900",
  "from-purple-700 to-slate-900",
  "from-blue-700 to-slate-900",
];

function pickGradient(text) {
  let sum = 0;
  for (let i = 0; i < text.length; i++) sum += text.charCodeAt(i);
  return GRADIENTS[sum % GRADIENTS.length];
}

// Shows the image, or a generated placeholder if there is no image or it fails to load.
export default function PosterImage({ src, title, className = "", showTitle = true }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = !src || failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${title} (poster not available)`}
        className={`flex flex-col items-center justify-center gap-3 bg-linear-to-br p-4 text-center ${pickGradient(title)} ${className}`}
      >
        <FilmIcon className="h-10 w-10 text-white/60" />
        {showTitle && <span className="text-sm font-semibold text-white/90">{title}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} poster`}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}
