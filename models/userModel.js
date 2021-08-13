const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name:String,
    surname:String,
    team:String,
    reservations:[{
      oneReservation:[{
        reservationId:String,
        floor:Number,
        placeNumber:Number,
        dataWithHour:String
      }]
    }],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;