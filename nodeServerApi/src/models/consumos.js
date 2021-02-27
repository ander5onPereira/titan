"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id é gerado automaticamente
  dispositivo: {
    type: String,
    required: true, // é requerido
    trim: true //remover espaço inicio e fim da string
  },
  tensao: {
    type: Number // tipo de dados
  },
  corrente: {
    type: Number
  },
  consumo: {
    type: Number
  }
});

module.exports = mongoose.model("Consumo", schema);
