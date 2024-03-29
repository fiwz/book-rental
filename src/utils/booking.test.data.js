const reqAddBooking = {
  member_code: "M002",
  book_code: ["NRN-7", "TW-11"],
  booking_date: "2024-03-29 20:00"
}

const reqAddSecondBooking = { ...reqAddBooking, book_code: ["JK-45"] }

const reqAddBookingByOtherMember = { ...reqAddBooking, member_code: "M001" }

const returnBook = { ...reqAddBooking, return_date: "2024-03-30 00:00" }

const returnBookByOtherMember = { ...returnBook, member_code: "M001" }

const returnBookMoreThanDeadline = { ...returnBook, return_date: "2024-04-07 00:00" }

const secondBookingAfterMissedDeadline = { ...reqAddBooking, booking_date: "2024-04-08 00:00" }

module.exports = {
  reqAddBooking,
  returnBook,
  reqAddBookingByOtherMember,
  reqAddSecondBooking,
  returnBookByOtherMember,
  returnBookMoreThanDeadline,
  secondBookingAfterMissedDeadline
}