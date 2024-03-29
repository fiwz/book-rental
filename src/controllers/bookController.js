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

    const data = books.map((item) => {
      // item.dataValues.createdAt = moment.utc(item.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
      // item.dataValues.updatedAt = moment.utc(item.updatedAt).local().format('YYYY-MM-DD HH:mm:ss');

      return item
    })

    return data
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}