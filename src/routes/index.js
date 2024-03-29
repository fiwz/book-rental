const express = require("express");
const { getMember } = require("../controllers/memberController");
const { getBook } = require("../controllers/bookController");
const {
  storeBooking,
  getBookingList,
  returnBook,
} = require("../controllers/bookingController");

const app = express();

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

// app.get("/booking", async (req, res) => {
//   try {
//     const data = await getBookingList(req);

//     res.status(200).json({
//       status: "success",
//       message: "Congrats! This is in a routes folder!",
//       data: data,
//     });
//   } catch (err) {
//     console.error(err);

//     res.status(err.code ? err.code : 500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// });

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
