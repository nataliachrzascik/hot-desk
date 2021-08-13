const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require('./config/dbConfig.js');
var path = require('path');


const app = express();

/*var corsOptions = {
  origin: "http://localhost:8081"
}
*/
app.use(cors(corsOptions));
app.use(cors({credentials: true, origin: true}));




const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(dbConfig.KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  

  app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
  app.use(bodyParser.json({limit: "50mb"}));


// simple route
/*app.get("/", (req, res) => {
  res.json({ message: "Workk" });
});*/

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

/*
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+ '/client/build/index.html'));
});
*/

require('./routes/authRoutes.js')(app);
require('./routes/userRoutes.js')(app);
require('./routes/dataRoutes.js')(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
      
    }
  });
}

