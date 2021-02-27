"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  nome: {
    type: String
  },
  ponto: {
    type: Number // tipo de dados
  },
  estado: {
    type: Boolean
  }
  /*,
  consumo: {
    type: Number
  }*/
});

module.exports = mongoose.model("Estados", schema);
