# 5-minute demo script

1. **Intro (30s).** "CineBook is a movie booking app built with React, Tailwind and React Router. It is front-end only; bookings are simulated and saved in localStorage."
2. **Home (30s).** Hero movie, Now Showing, genre chips, Coming Soon. "All of this comes from data files turned into class instances. There is no movie text in the JSX."
3. **Catalog (60s).** Type "in", pick Sci-Fi, switch to Now Showing, sort by rating, then Clear filters. Point out the URL changing: "Filters live in the URL, so refresh keeps them."
4. **Details (30s).** Open Inception. "The page reads `:movieId` with `useParams` and looks the movie up." Show an invalid id.
5. **Seats and price (75s).** Pick a showtime, select seats, try a taken seat, try a 7th seat, change showtime (selection resets). Show subtotal, fee, total updating. "Price is P250 to P700 from rating and fame score."
6. **Confirm (30s).** Review page, confirm, show the reference and the "simulated" notice.
7. **My Tickets (30s).** Refresh to show persistence. Cancel the booking and show the seats free again.
8. **OOP (45s).** Open `src/models/` and the class diagram. "Seven classes. Showtime owns occupancy; Booking has confirm and cancel; services hold business rules."
9. **Wrap up (20s).** Resize to mobile. Limitations: localStorage is per-browser, no real seat locking, no payments.

## Likely questions

**Why React?** Components make reusable UI and state changes update the screen automatically.

**Why Tailwind only?** Utility classes style elements directly; `index.css` only imports Tailwind, so there is no custom CSS.

**How does routing work?** React Router maps URLs to page components. `useParams` reads `:movieId`/`:showtimeId`; `useNavigate` moves between pages; `*` handles 404.

**Where is state?** `useState` for seat selection and menus; `useMemo` for filtered lists and occupied seats; `BookingContext` shares saved bookings across pages; filters are in URL search params.

**Why is Seat status not on Seat?** The same physical seat is free in one showtime and taken in another, so occupancy belongs to the Showtime (plus confirmed bookings).

**How are taken seats protected if someone edits the HTML?** `validateSeatSelection` in `bookingService` re-checks every seat on the seat page, the review page, and at confirmation. The UI is never trusted.

**How are prices set?** `calculateBasePrice` in `utils/pricing.js`: 60% rating + 40% fame, mapped to P250-P700, rounded to P10.

**How does cancelling work?** Occupied seats = demo seats + seats of CONFIRMED bookings. Cancelling flips status to CANCELLED, so the seats free up automatically.

**What are the localStorage limits?** Per browser and device, not secure, no real seat locking between users. A real system needs a backend and database.

**What is a class here vs. plain data?** Data files create `Movie`, `Showtime`, etc. instances; methods like `isBookable()` and `getFormattedDateTime()` keep logic out of JSX.
