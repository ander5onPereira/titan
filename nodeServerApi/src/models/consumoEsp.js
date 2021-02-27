"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id é gerado automaticamente
  nome: {
    type: String
    //required: true, // é requerido
    //trim: true //remover espaço inicio e fim da string
  },
  data: {
    type: Date // tipo de dados
  },
  consumo: {
    type: Number
  }
});

module.exports = mongoose.model("ConsumoEsp", schema);
