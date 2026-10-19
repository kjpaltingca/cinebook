# CineBook

*Your movie night, just a few clicks away.*

CineBook is a front-end movie ticket booking app: browse and filter movies, pick a cinema and showtime, choose seats on an interactive map, review the price, and get a simulated confirmation. It is an academic project. **Cinemas, schedules and some titles are fictional demo data, and no real tickets or payments are involved.**

## Features
- Home page with hero, Now Showing, Popular, Coming Soon and genre shortcuts
- Catalog with title search, genre filter, availability filter and sorting, all combined (filters live in the URL)
- Movie details loaded from the route parameter, with cast, cinemas and showtimes
- Interactive seat map: 6-seat limit, taken seats blocked, legend, live price, reset on showtime change
- Review and confirmation with a unique booking reference
- My Tickets with persistence (localStorage) and cancel booking that frees the seats
- Ticket prices from P250 to P700 based on rating and fame, plus a P20 per-ticket online fee
- Responsive layout, visible focus states, labeled form controls, seat states shown by icon and text, not color alone

## Technologies
React, Vite, Tailwind CSS v4, React Router DOM, JavaScript (ES6 classes). No backend, no database, no external API.

## Install and run
```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run preview    # preview the production build
```

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/movies` | Catalog (`?q=&genre=&status=&sort=`) |
| `/movies/:movieId` | Movie details |
| `/booking/:showtimeId` | Seat selection |
| `/booking/:showtimeId/review` | Review |
| `/confirmation/:bookingId` | Confirmation |
| `/my-tickets` | My Tickets |
| `/about` | About |
| `*` | 404 |

## OOP models (`src/models/`)
`Movie`, `Cinema`, `Auditorium`, `Seat`, `Showtime`, `Booking`, `User`. See `docs/class-diagram.md` for the Mermaid diagram. Business rules live in `src/services/` and `src/utils/`, not in JSX.

## Project structure
```
src/
  constants.js          shared constants and status values
  models/               7 classes
  data/                 movies, cinemas, auditoriums, showtimes (generated), navigation, site text
  services/             movieService, bookingService, storageService
  context/ + hooks/     BookingProvider, useBookings, useLocalStorage
  utils/                pricing, formatters, shared Tailwind class strings
  components/           Navbar, Footer, MovieCard, SeatMap, SeatButton, ShowtimeSelector, ...
  pages/                one file per route
docs/                   class diagram, test checklist, demo script
```

## Demo data
- 15 movies: 12 Now Showing (9 real films with approximate public metadata, 3 fictional) and 3 fictional Coming Soon titles. Ratings and fame scores are demo values.
- 3 fictional cinemas with 3 auditoriums each. Seats are generated from rows x seats per row.
- Showtimes are generated for the next 5 days from today's date, so there are always upcoming shows. Some seats are pre-occupied (demo seed).

### Adding poster images
Put image files in `public/posters/`, named `<movie-id>.jpg` (poster) and `<movie-id>-backdrop.jpg` (hero banner), for example `public/posters/inception.jpg`. Use images you have the right to use. Missing images fall back to a generated placeholder.

## localStorage limitations
Bookings are saved in this browser only, under the key `cinebook.bookings.v1`. They are not secure, are not shared between browsers or devices, and cannot lock seats against other users. Clear them with `localStorage.clear()` in the browser console.

## Known limitations
- No real accounts, payments or backend; the user is a demo user
- Seat availability is only consistent within one browser
- Poster images are not included

## Screenshots
_Add screenshots here (home, catalog, seat selection, confirmation)._

## Links
- Figma: _paste link here_
- Class diagram: _paste link here_ (see `docs/class-diagram.md`)

## Git
```bash
git add .
git commit -m "Complete CineBook application"
git push
```
