import { MOVIE_STATUS } from "../constants.js";
import { calculateBasePrice } from "../utils/pricing.js";
import { formatDuration } from "../utils/formatters.js";

export default class Movie {
  constructor({
    id,
    title,
    synopsis,
    genres,
    durationMinutes,
    rating,
    fameScore,
    releaseDate,
    status,
    posterUrl,
    backdropUrl,
    cast,
    showtimeIds = [],
  }) {
    this.id = id;
    this.title = title;
    this.synopsis = synopsis;
    this.genres = genres;
    this.durationMinutes = durationMinutes;
    this.rating = rating; // 0 to 10 (0 = not yet rated)
    this.fameScore = fameScore; // 0 to 10 (demo value, used for pricing)
    this.releaseDate = releaseDate; // "YYYY-MM-DD"
    this.status = status; // MOVIE_STATUS value
    this.posterUrl = posterUrl;
    this.backdropUrl = backdropUrl;
    this.cast = cast;
    this.showtimeIds = showtimeIds;
  }

  getFormattedDuration() {
    return formatDuration(this.durationMinutes);
  }

  isBookable() {
    return this.status === MOVIE_STATUS.NOW_SHOWING && this.showtimeIds.length > 0;
  }

  getBasePrice() {
    return calculateBasePrice(this);
  }
}
