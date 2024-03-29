const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { Book } = require('../models/book')
const { Booking } = require('../models/bookings')
const { BookingDetails } = require('../models/booking-details')

const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const moment = require('moment');
const { Member } = require("../models/member");

const MAX_BOOK = 2;

exports.storeBooking = async (req, res) => {
  try {
    /** Check member penalized status */
    const checkPenalized = await Member.findAll({
      where: {
        code: req.body.member_code,
        [Op.or]: {
          is_penalized: {
            [Op.not]: 1
          },
          penalized_end_date: {
            [Op.or]: {
              [Op.lt]: req.body.booking_date,
              [Op.is]: null
            }

          }
        }
      }
    })
    if (checkPenalized.length < 1) throw new Error(`You have penalized! Not allowed to borrow book for a while.`)

    /** Check the book's stock */
    const bookStock = await Book.findAll({
      attributes: ['code', 'stock'],
      where: {
        code: {
          [Op.in]: req.body.book_code
        },
        stock: {
          [Op.gt]: 0 // greater than
        }
      }
    })
    if (bookStock.length < 1) throw new Error(`Stock is empty!`)

    // Only booking available book
    let availableBook = bookStock.map((book) => {
      return book.dataValues.code
    });

    /** Check if the member already borrow books */
    const checkBooking = await Booking.findAll({
      where: {
        member_code: req.body.member_code
      },
      include: {
        model: BookingDetails,
        where: {
          booking_date_end: {
            [Op.is]: null // User has not return the book
          }
        }
      }
    })

    /** Return error if user has reach maximum quota */
    if (checkBooking.length > 0 && checkBooking[0].dataValues.booking_details.length >= MAX_BOOK) {
      throw new Error(`You have reached maximum number of booking! Please return the book first.`)
    }

    /** Proceed to booking and store data */
    const store = await Booking.create({
      booking_code: 'B'+nanoid(),
      member_code: req.body.member_code,
      createdAt: moment(),
      updatedAt: moment()
    })

    /** Store booking details */
    let inputDetails = [];
    for (let bc of req.body.book_code) {
      inputDetails.push(
        {
          booking_code: store.booking_code,
          book_code: bc,
          booking_date_start: moment(req.body.booking_date),
          deadline: moment(req.body.booking_date).add(7, 'day'),
          booking_date_end: null
        }
      )
    }
    const storeDetails = await BookingDetails.bulkCreate(inputDetails);

    /** Update book stock */
    const updateStock = await Book.update(
      {
        stock: 0
      },
      {
        where: {
          code: {
            [Op.in]: availableBook
          }
        }
      }
    );
    let borrowedBook = await Book.findAll({
      attributes: ['code', 'title', 'author'],
      where: {
        code: {
          [Op.in]: availableBook
        }
      }
    })

    return borrowedBook;
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}

exports.returnBook = async (req, res) => {
  try {
    /** Check if the member already borrow books */
    const checkBooking = await Booking.findAll({
      where: {
        member_code: req.body.member_code
      },
      include: {
        model: BookingDetails,
        where: {
          book_code: {
            [Op.in]: req.body.book_code
          },
          booking_date_end: {
            [Op.is]: null // User has not return the book
          }
        }
      }
    })
    if (checkBooking.length < 1) throw new Error(`You don't have book to be returned!`)

    // Only return member's book
    let myBookingCode = [];
    let myBook = [];
    let myDeadlineDate = [];

    // Iterate through booking data
    checkBooking.map((book) => {
      myBookingCode.push(book.dataValues.booking_code)

      // booking details more than 1 book with the same booking_code
      book.dataValues.booking_details.map((details) => {
        myDeadlineDate.push(details.dataValues.deadline)
        myBook.push(details.dataValues.book_code)
      })

      return book;
    });

    /** Update booking details */
    const updateDetails = await BookingDetails.update(
      {
        booking_date_end: moment(req.body.return_date)
      },
      {
        where: {
          booking_code: {
            [Op.in]: myBookingCode
          },
          book_code: {
            [Op.in]: myBook
          }
        }
      }
    )

    /** Update book stock */
    const updateStock = await Book.update(
      {
        stock: 1
      },
      {
        where: {
          code: {
            [Op.in]: myBook
          }
        }
      }
    );

    /** Check member if penalized */
    if (myDeadlineDate.length > 0) {
      myDeadlineDate = myDeadlineDate.sort();

      let returnDate = moment(req.body.return_date).format('YYYY-MM-DD HH:mm:ss');
      let mostOldDeadline = moment.utc(myDeadlineDate[0]).format('YYYY-MM-DD HH:mm:ss');

      /** Update member penalized */
      if (moment(returnDate).isAfter(mostOldDeadline)) {
        let reverseDeadlineDate = myDeadlineDate.reverse();
        let penalizeDate = moment(returnDate).add(3, 'day')
        const updateMemberStatus = await Member.update(
          {
            is_penalized: 1,
            penalized_end_date: penalizeDate
          },
          {
            where: {
              code: req.body.member_code
            }
          }
        );
      } else {
        const updateMemberStatus = await Member.update(
          {
            is_penalized: 0,
            penalized_end_date: null
          },
          {
            where: {
              code: req.body.member_code
            }
          }
        );
      } // end of update member penalized
    }

    return checkBooking
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}
