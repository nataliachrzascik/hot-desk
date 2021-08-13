const mongoose = require("mongoose");

const Reservation = mongoose.model(
  "Reservation",
  new mongoose.Schema({
    officeName: String,
    placeNumber: Number,
    isDefaultTaken: Boolean,
    reservations:[
     {
        id:mongoose.Schema.Types.ObjectId,
        date: String,
        userID:String
     }
    ]
    
  })
);

module.exports = Reservation;

