"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id é gerado automaticamente
  title: {
    type: String // tipo de dados
    //required: true, // é requerido
    //trim: true //remover espaço inicio e fim da string
  },
  slug: {
    type: String // tipo de dados
    //required: true, // é requerido
    //trim: true, //remover espaço inicio e fim da string
    //index: true, // cria o indice unico "chave primaria"
    //unique: true //Índices exclusivos de campo único
  },
  description: {
    type: String
    //required: true,
    // trim: true
  },
  price: {
    type: Number
    //required: true
  },
  active: {
    type: Boolean,
    //required: true,
    default: true //valor padrão
  },
  tags: [
    {
      type: String
      //required: true
    }
  ]
});

module.exports = mongoose.model("Product", schema);
