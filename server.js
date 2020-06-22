const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const db = require("./app/models");

const app = express();

let whiteList = ["http://localhost:8081"];
let corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOption));

// parse request application of content-type - application/json
app.use(bodyParser.json());

// parse request application  of content-type - application/json/x-www-urlcoded
app.use(bodyParser.urlencoded({ extended: true }));

//Sync database
db.sequelize.sync();

//simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ExMySQL",
  });
});

// Posts routes
require("./app/routes/post.routes")(app);

// set port, listen for reqeuests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
