"use strict";

const mongoose = require("mongoose");
const ConsumoEsp = mongoose.model("ConsumoEsp");

exports.get = (req, res, next) => {
  ConsumoEsp.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.post = (req, res, next) => {
  var product = new ConsumoEsp(req.body);
  //var product = new Product();
  //product.title = req.body.title;
  product
    .save()
    .then(x => {
      res.status(201).send({
        message: "Produto cadastrado com sucesso!"
      });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao cadastrar produto!",
        data: e
      });
    });
  res.status(201).send(req.body);
};
exports.getNome = (req, res, next) => {
  ConsumoEsp.find({ nome: req.params.nome })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getSomaConsumo = (req, res, next) => {
  //db.consumoesps.aggregate([{$group:{_id:"$nome",total:{$sum:1}}}])
  //db.consumoesps.aggregate([{$group:{_id:"$nome",total:{$sum:"$consumo"}}}])
  //console.log("ENTROU");
  ConsumoEsp.aggregate([
    { $group: { _id: "$nome", total: { $sum: "$consumo" } } }
  ])
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.postConsumo = (req, res, next) => {
  //var id = req.params;
  var id = req.body;
  var id1 = id.nome[0];
  var consumo1 = id.consumo[0];
  console.log(id);
  console.log(id1);
  console.log(consumo1);
  /* REMOVER COMENTARIO PARA SALVAR DADOS NO BANCO  
  var consumoEsp = new ConsumoEsp(req.body);
  consumoEsp
    .save()
    .then(x => {
      res.status(201).send({
        message: "Produto cadastrado com sucesso!"
      });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao cadastrar produto!",
        data: e
      });
    });
  res.status(201).send(req.body);
*/

  res.status(200).send(id);
};
exports.delete = (req, res, next) => {
  ConsumoEsp.findOneAndDelete({ nome: req.body.nome })
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
