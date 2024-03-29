const { Op } = require("sequelize");
const { Book } = require('../models/book')

const moment = require('moment');

exports.getBook = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ['code', 'title', 'author', 'stock'],
      where: {
        stock: {
          [Op.not]: 0
        }
      },
      order: [
        ['title', 'ASC']
      ],
    });
    return books
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}