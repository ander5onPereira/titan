var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + "/views/";
const PORT = 3000;
const HOST = "0.0.0.0";
router.use(function(req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function(req, res) {
  res.sendFile(path + "index.html");
});

router.get("/config", function(req, res) {
  res.sendFile(path + "config.html");
});
router.get("/add", function(req, res) {
  res.sendFile(path + "add.html");
});
router.get("/status", function(req, res) {
  res.sendFile(path + "status.html");
});
app.use(express.static(path));
app.use("/", router);

app.listen(3000, function() {
  console.log("LOCALHOST:3000!");
});
//node app.js executa server
