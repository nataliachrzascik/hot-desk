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

  
let team=req.url.substring(19);
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

    

    let temp=req.url.substring(13,req.url.length);
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
 

  if(data.length===0){
  //zabezpieczenie przed sytuacj??, gdy dw??ch u??ytkownik??w wczyta??o w tej samej chwili aplikacj??, i oboje chca zarezerwowa?? ten sam pok??j na ten sam dzie??
     


  find('users', {'_id': mongoose.Types.ObjectId(id) }, function (err, userGet) {

    if(err){
      console.log("err");
      console.log(err);
      res.status(500).send("error in controlers");
      return;
    }

    if(userGet){

        //zabezpieczenie przed sytuacj??, gdy u??ytkownik nie istnieje
        find('users', {'reservations.date' : moment.utc(year+"-"+month+"-"+day), '_id': mongoose.Types.ObjectId(id) }, function (err, first) {

          if(err){
            console.log("err");
            console.log(err);
            res.status(500).send("error in controlers");
            return;
          }
       

          if(first.length===0){

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

        }else{
          res.send("U??ytkownik mo??e mie?? tylko 1 rezerwacje dziennie");
          return;
        }

        
        });

    }else{
      res.send("Nice try panie testerze. U??ytkownik nie istnieje!");
      return;
    }


  });

    }
    else{
       console.log("To ju?? by??o zaj??te!")
      res.send("Kto?? prawdopodobnie ubieg?? Ci?? w rezerwacji miejsca!");
      return;
    }
 
      

});



  

  }

  exports.getUserReservations = (req, res) => {


    
   let nick=req.url.substring(6,req.url.length)
    
   
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

      
exports.declineReservations = (req, res) => {


let temp=req.url.substring(9);
let user=temp.substring(0,temp.indexOf("/"));


let date=temp.substring(temp.indexOf("/")+1);
date=date.substring(0,10);
let temp1=temp.substring(temp.indexOf("/")+12);
let place=temp1.substring(0,temp1.indexOf("/"));
let idUser=temp1.substring(temp1.indexOf("/")+1,temp1.length)


place=Number(place);




db.mongoose.connection.db.collection('users').updateMany({'_id': mongoose.Types.ObjectId(idUser)}, {
  $pull: {
    reservations:{date:moment.utc(date)}
  }
}, {
  multi: true
});


db.mongoose.connection.db.collection('wroclaw2').updateMany({'reservations.userID': idUser}, {
  $pull: {
    reservations:{date:moment.utc(date)}
  }
  }, {
    multi: true
  });

  res.send("deleted")






  };


