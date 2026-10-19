# CineBook manual test checklist

Run `npm run dev`, open the browser console (F12), and keep it visible. Tick each box.
Tip: to reset everything, run `localStorage.clear()` in the console and refresh.

## Navigation
- [ ] Navbar links (Home, Movies, My Tickets, About) go to the right pages and the active one is highlighted
- [ ] Logo returns home; footer links work
- [ ] At 390px wide, the hamburger opens and closes the menu and a link click closes it
- [ ] `/anything-random` shows "Page not found"

## Catalog
- [ ] Search "dune" shows only Dune: Part Two; clearing the box shows all 15
- [ ] Genre filter: Sci-Fi shows only Sci-Fi movies
- [ ] Availability: "Coming Soon" shows 3 movies, "Now Showing" shows 12
- [ ] Search + genre + availability together narrow results; counter text updates
- [ ] Sort: title A-Z, release date newest first, rating highest first
- [ ] Search "zzzz" shows the empty state; "Clear filters" resets everything
- [ ] Home page genre chips open the catalog with that genre selected
- [ ] Refresh the page with filters applied: filters stay (they are in the URL)

## Details
- [ ] Open any now-showing movie: poster, synopsis, cast, cinemas, showtimes show
- [ ] `/movies/not-a-movie` shows "Movie not found"
- [ ] A coming-soon movie shows the "not open for booking yet" message and no seat button
- [ ] Changing cinema/date/time updates the shown ticket price correctly

## Seat selection
- [ ] Click a free seat: it turns violet with a check; click again: it deselects
- [ ] Taken seats show an X, are disabled, and cannot be selected (try Tab + Enter too)
- [ ] Select 6 seats, then try a 7th: message "up to 6 seats" appears
- [ ] "Review booking" is disabled with 0 seats
- [ ] Select seats, then change time or cinema: selection resets to empty
- [ ] Subtotal, fee (P20 per ticket) and total update instantly. Check: 2 seats at P550 = P1,100 + P40 = P1,140
- [ ] Prices are always between P250 and P700
- [ ] On a phone-width screen the seat map scrolls sideways inside its own box; the page itself does not

## Review and confirmation
- [ ] Review shows reference, movie, cinema, date/time, seats, quantity, price, subtotal, fee, total
- [ ] "Simulated booking" notice is visible
- [ ] "Go back" returns to seats; opening `/booking/<id>/review` directly redirects back to seats
- [ ] Confirm goes to the confirmation page with the same reference as the review page
- [ ] Make a second booking: its reference is different
- [ ] Browser Back from confirmation does not return to the review page

## Persistence and My Tickets
- [ ] After confirming, My Tickets lists the booking; refresh: it is still there
- [ ] Book the same showtime again: the seats you booked now show as taken
- [ ] Cancel a booking (two-step confirm): status becomes Cancelled and its seats are free again on the seat page
- [ ] With no bookings, My Tickets shows the empty state

## Edge cases
- [ ] Corrupted storage: console `localStorage.setItem("cinebook.bookings.v1","{oops")`, refresh: app still loads, My Tickets is empty
- [ ] Two tabs: book seat A1 in tab 1; tab 2 (same showtime, after the tab refreshes its data via the storage event) shows A1 taken. Confirming a taken seat shows an error
- [ ] Missing poster images: placeholders with the movie title appear (expected until you add images)
- [ ] Tab through every page: a visible focus outline appears on each control
- [ ] No red errors in the console on any page
