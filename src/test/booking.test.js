require("dotenv").config();
const request = require("supertest");
const app = require("../server.js");
const {
  reqAddBooking,
  reqAddBookingByOtherMember,
  reqAddSecondBooking,
  returnBook,
  returnBookByOtherMember,
  returnBookMoreThanDeadline,
  secondBookingAfterMissedDeadline
} = require("../utils/booking.test.data.js");

let bookingCode;
describe("POST /api/booking", () => {
  it("should return 200 and store a new booking", async () => {
    return request(app)
      .post("/api/booking")
      .expect("Content-Type", /json/)
      .send(reqAddBooking)
      .expect(200)
      .then((res) => {
        bookingCode = res.body.data.booking_code;
      });
  });
});

describe("POST /api/booking", () => {
  it("should return 500 and user has reach max limit to borrow", async () => {
    return request(app)
      .post("/api/booking")
      .expect("Content-Type", /json/)
      .send(reqAddSecondBooking)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('You have reached maximum number of booking! Please return the book first.')
      })
  });
});

describe("POST /api/booking", () => {
  it("should return 500 and book's stock is empty", async () => {
    return request(app)
      .post("/api/booking")
      .expect("Content-Type", /json/)
      .send(reqAddBookingByOtherMember)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('Stock is empty!')
      })
  });
});

describe("POST /api/return-book", () => {
  it("should return 500 and member can not return other member's book", async () => {
    return request(app)
      .post("/api/return-book")
      .expect("Content-Type", /json/)
      .send(returnBookByOtherMember)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('You don\'t have book to be returned!')
      })
  });
});

describe("POST /api/return-book", () => {
  it("should return 200 and update booking details, book stock, or member penalize", async () => {
    return request(app)
      .post("/api/return-book")
      .expect("Content-Type", /json/)
      .send(returnBook)
      .expect(200)
  });
});

/** Test Case for Penalized Member */
describe("POST /api/booking", () => {
  it("should return 200 and store a new booking", async () => {
    return request(app)
      .post("/api/booking")
      .expect("Content-Type", /json/)
      .send(reqAddBooking)
      .expect(200)
      .then((res) => {
        bookingCode = res.body.data.booking_code;
      });
  });
});

describe("POST /api/return-book", () => {
  it("should return 200 and member is penalized", async () => {
    return request(app)
      .post("/api/return-book")
      .expect("Content-Type", /json/)
      .send(returnBookMoreThanDeadline)
      .expect(200)
  });
});

describe("POST /api/booking", () => {
  it("should return 500 and user is in penalized time", async () => {
    return request(app)
      .post("/api/booking")
      .expect("Content-Type", /json/)
      .send(reqAddBooking)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toEqual('You have penalized! Not allowed to borrow book for a while.')
      });
  });
});