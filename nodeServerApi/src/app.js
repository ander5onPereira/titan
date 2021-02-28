"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");
const cors = require("cors");
const app = express();

const router = express.Router();

//connecta ao banco

/*mongoose
  .connect("mongodb://localhost/apitest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Banco MongoBD Conectado...");
  })
  .catch(err => {
    console.log("Erro de connection mongo DB" + err);
  });*/
mongoose.set("useFindAndModify", false);
// carregando models
const Product = require("./models/product");
const Estados = require("./models/estados");
const Consumos = require("./models/consumos");
const ConsumosEsp = require("./models/consumoEsp");

//carregando rotas
const index = require("./routes/index");
const products = require("./routes/products");
const estados = require("./routes/estados");
const consumos = require("./routes/consumo");
const consumosEsp = require("./routes/consumoEsp");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//const estado = require("./routes/estados");
//const config = require("./routes/config");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", products);
app.use("/estados", estados);
app.use("/consumo", consumos);
app.use("/consumoEsp", consumosEsp);

//app.use("/config", config);

module.exports = app;
