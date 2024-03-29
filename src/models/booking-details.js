const db = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { Book } = require("./book.js");

const BookingDetails = db.define(
  "booking_details",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    booking_code: {
      type: DataTypes.CHAR
    },
    book_code: {
      type: DataTypes.STRING
    },
    booking_date_start: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    booking_date_end: {
      allowNull: true, // WILL BE FILLED WHEN MEMBER RETURNS THE BOOK
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deadline: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

BookingDetails.hasOne(Book, {
  sourceKey: "book_code",
  foreignKey: "code",
});
Book.belongsTo(BookingDetails, {
  foreignKey: "code",
  targetKey: "book_code",
});

module.exports = { BookingDetails }