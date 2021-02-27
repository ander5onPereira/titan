"use strict";

const mongoose = require("mongoose");
const Consumo = mongoose.model("Consumo");

exports.get = (req, res, next) => {
  res.status(200).send({
    tensao: "Tensão",
    corrente: "Corrente",
    potencia: "valor W/min"
  });
};
exports.delete = (req, res, next) => {
  //Product.findOneAndRemove(req.params.id).then(x => {
  // console.log(req.body.nome);
  //res.status(200).send("OKS");
  Consumo.findOneAndDelete({ nome: req.body.nome })
    //Estados.findByIdAndRemove(req.body._id)
    .then(x => {
      res.status(200).send({
        message: "Produto removido com sucesso!" + req.body.nome + ""
      });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao remover produto!",
        data: e
      });
    });
  /*const id = req.params.id;
  res.status(200).send({
    id: id,
    item: req.body
  });*/
};
