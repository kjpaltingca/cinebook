export default class User {
  constructor({ id, name, email, bookingIds = [] }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.bookingIds = bookingIds;
  }

  addBooking(bookingId) {
    if (!this.bookingIds.includes(bookingId)) this.bookingIds.push(bookingId);
  }
}
