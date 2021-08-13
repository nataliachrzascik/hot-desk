const { authJwt } = require("../middlewares");
const controller = require("../controllers/dataController.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
console.log("routerr")
  app.post("/mainPage/*", controller.getData);

  app.post("/reservation/*", controller.makeReservation);

  app.post("/user/*", controller.getUserReservations);

};