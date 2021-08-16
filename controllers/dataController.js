const config=require("../config/authConfig.js");
const db=require("../models");
const Reservations=db.reservations;
const mongoose = require('mongoose');
var moment = require('moment');



var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');

function find (name, query, cb) {
  db.mongoose.connection.db.collection(name, function (err, collection) {
     collection.find(query).toArray(cb);
 });
}


exports.getData = (req, res) => {
  console.log(req.url)

  let first="http://localhost:8080"+req.url;
  let team=first.substring(19);
//let team=req.url.substring(19);
team=team.substring(0,team.indexOf("/"));

let date=req.url.substring(19);
date=date.substring(date.indexOf("/")+1);
date=date.substring(date.indexOf("/")+1);

let year=date.substring(0,4);
let month=date.substring(4,6);
let day=date.substring(6,8);

find('wroclaw2', {'reservations.date' : moment.utc(year+"-"+month+"-"+day), 'officeName': team }, function (err, data) {

  if(err){
    console.log("err");
    console.log(err);
    res.status(500).send("error in controlers");
    return;
  }
      res.send(data);
      return;

});
  };

  exports.makeReservation = (req, res) => {

    let first="http://localhost:8080"+req.url;
    let temp=first.substring(13,first.length);

    //let temp=req.url.substring(13,req.url.length);
    let numberPlace=temp.substring(0,temp.indexOf("/"));
    numberPlace=Number(numberPlace);
   temp=temp.substring(temp.indexOf("/")+1,temp.length);
   let date=temp.substring(0,8);
   id=temp.substring(9,temp.length);


   let dateNow = new Date();
   let dayNow = ("0" + dateNow.getDate()).slice(-2);
  dayNow=Number(dayNow);
  dayNow=dayNow+1;
  dayNow=dayNow.toString();
  let monthNow = ("0" + (dateNow.getMonth() + 1)).slice(-2).toString();
  let yearNow = dateNow.getFullYear().toString();

    let year=date.substring(0,4);
    let month=date.substring(4,6);
    let day=date.substring(6,8);




let myTime=moment().subtract(1,'day');
myTime=myTime.format("YYYY-MM-DD");



db.mongoose.connection.db.collection('wroclaw2').updateMany({}, {
  $pull: {
      reservations: {
        date:{
          $lte:  moment.utc(myTime)
        }
       
          }
  }
}, {
  multi: true
})


db.mongoose.connection.db.collection('users').updateMany({}, {
  $pull: {
      reservations: {
        date:{
          $lte:  moment.utc(myTime)
        }
       
          }
  }
}, {
  multi: true
})



find('wroclaw2', {'reservations.date' : moment.utc(year+"-"+month+"-"+day), 'placeNumber': numberPlace }, function (err, data) {

  if(err){
    console.log("err");
    console.log(err);
    res.status(500).send("error in controlers");
    return;
  }
 

  if(data!=true){
  //zabezpieczenie przed sytuacją, gdy dwóch użytkowników wczytało w tej samej chwili aplikację, i oboje chca zarezerwować ten sam pokój na ten sam dzień
     
  db.mongoose.connection.db.collection('wroclaw2').findOneAndUpdate(
    { 'placeNumber': numberPlace }, 
    { $push: { reservations: {reservationID: mongoose.Types.ObjectId(),date: moment.utc(year+"-"+month+"-"+day),userID:id}  } },
   function (error, success) {
         if (error) {
          console.log("error");
             console.log(error);
         } else {
          db.mongoose.connection.db.collection('users').findOneAndUpdate(
            { '_id': mongoose.Types.ObjectId(id) }, 
            { $push: { reservations: {reservationID: mongoose.Types.ObjectId(),date:moment.utc(year+"-"+month+"-"+day),place:numberPlace}  } },
           function (error, success) {
                 if (error) {
                  console.log("error");
                     console.log(error);
                 } else {
                  console.log("success");
                  res.send(success.value);
                  return;
        
                 }
             });

         }
     });

    }
    else{
      res.send("Ktoś prawdopodobnie ubiegł Cię w rezerwacji miejsca!");
      return;
    }
 
      

});



  

  }

  exports.getUserReservations = (req, res) => {

    let first="http://localhost:8080"+req.url;

    let nick=first.substring(6,first.length)
   //let nick=req.url.substring(6,req.url.length)
    
   
    find('users', {'username': nick }, function (err, data) {
    
      if(err){
        console.log("err");
        console.log(err);
        res.status(500).send("error in controlers");
        return;
      }
          res.send(data);
          return;
    
    });
    
      };
