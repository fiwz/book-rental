const db = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { Booking } = require("./bookings.js");

const Member = db.define(
  "members",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    is_penalized: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    penalized_end_date: {
      type: DataTypes.DATE,
      allowNull: true
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
  }
);

Member.hasMany(Booking, {
  sourceKey: "code",
  foreignKey: "member_code",
});
Booking.belongsTo(Member, {
  foreignKey: "member_code",
  targetKey: "code",
})

module.exports = { Member }