const express = require("express");
const { getMember } = require("../controllers/memberController");
const { getBook } = require("../controllers/bookController");
const {
  storeBooking,
  returnBook,
} = require("../controllers/bookingController");

const app = express();

/** GET Methods */
/**
 * @openapi
 * '/api/members':
 *  get:
 *     tags:
 *     - Member Controller
 *     summary: Fetch a list of members and their borrowed books
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get("/members", async (req, res) => {
  try {
    const data = await getMember();
    res.status(200).json({
      status: "success",
      message: "Successfully retrieved members!",
      data: data,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      status: "error",
      message: err.message,
    });
  }
});

/** GET Methods */
/**
 * @openapi
 * '/api/books':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get available books
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get("/books", async (_, res) => {
  try {
    const data = await getBook();
    if (data.status == "error") throw new Error(data.message);

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved books!",
      data: data,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      status: "error",
      message: err.message,
    });
  }
});

/** POST Methods */
/**
 * @openapi
 * '/api/booking':
 *  post:
 *     tags:
 *     - Booking Controller
 *     summary: Endpoints for borrow the books
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - member_code
 *              - book_code
 *              - booking_date
 *            properties:
 *              member_code:
 *                type: string
 *                default: M002
 *              book_code:
 *                type: array
 *                default: ["NRN-7", "TW-11"]
 *              booking_date:
 *                type: date
 *                default: "2024-03-29 20:00"
 *     responses:
 *      200:
 *        description: Successfully borrow the book
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.post("/booking", async (req, res) => {
  try {
    const data = await storeBooking(req);
    if (data.status == "error") throw new Error(data.message);

    res.status(200).json({
      status: "success",
      message: "You have successfully borrow the book!",
      data: data,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      status: "error",
      message: err.message,
    });
  }
});

/** POST Methods */
/**
 * @openapi
 * '/api/return-book':
 *  post:
 *     tags:
 *     - Booking Controller
 *     summary: Return the book that member has borrowed
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - member_code
 *              - book_code
 *              - return_date
 *            properties:
 *              member_code:
 *                type: string
 *                default: M002
 *              book_code:
 *                type: array
 *                default: ["NRN-7", "TW-11"]
 *              return_date:
 *                type: date
 *                default: "2024-03-30 20:00"
 *     responses:
 *      200:
 *        description: Successfully return the book
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.post("/return-book", async (req, res) => {
  try {
    const data = await returnBook(req);
    if (data.status == "error") throw new Error(data.message);

    res.status(200).json({
      status: "success",
      message: "You have successfully return the book!",
      data: data,
    });
  } catch (err) {
    res.status(err.code ? err.code : 500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = app;
