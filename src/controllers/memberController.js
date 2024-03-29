const { Op } = require('sequelize');
const { BookingDetails } = require('../models/booking-details');
const { Booking } = require('../models/bookings');
const { Member } = require('../models/member');
const { Book } = require('../models/book');

exports.getMember = async (req, res) => {
  try {
    const members = await Member.findAll({
      order: [
        ['code', 'ASC']
      ],
      include: [{
        model: Booking,
        include: [{
          model: BookingDetails,
          where: {
            booking_date_end: {
              [Op.is]: null
            }
          },
          include: [{
            model: Book
          }],
        }]
      }]
    });

    const data = members.map((member) => {
      let currentBookCount = 0;
      member.dataValues.bookings.map((bookingItem) => {
        /** Count how many book that member borrow */
        currentBookCount += Number(bookingItem.dataValues.booking_details.length);

        /** Book details, name, author, etc */
        let borrowed_book = [];
        bookingItem.dataValues.booking_details.map((singleBook) => {
          borrowed_book.push({
            code: singleBook.dataValues.book.code,
            title: singleBook.dataValues.book.title,
            author: singleBook.dataValues.book.author
          });
        })
        member.dataValues.borrowed_book = borrowed_book
      })
      member.dataValues.borrowed_book_count = currentBookCount

      return {
        code: member.code,
        name: member.name,
        borrowed_book_count: member.dataValues.borrowed_book_count,
        borrowed_book: member.dataValues.borrowed_book
      };
    })

    return data
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}