const db = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { BookingDetails } = require("./booking-details.js");

const Booking = db.define(
  "bookings",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    booking_code: {
      type: DataTypes.CHAR,
    },
    member_code: {
      type: DataTypes.CHAR,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['id', 'booking_code'],
      },
    ],
  }
);

Booking.hasMany(BookingDetails, {
  sourceKey: "booking_code",
  foreignKey: "booking_code",
});
BookingDetails.belongsTo(Booking, {
  foreignKey: "booking_code",
  targetKey: "booking_code",
})

module.exports = { Booking };
