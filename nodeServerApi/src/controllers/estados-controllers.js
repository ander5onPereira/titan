"use strict";

const mongoose = require("mongoose");
const Estados = mongoose.model("Estados");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
  Estados.find({}, "nome ponto estado")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getStatus = (req, res, next) => {
  res.status(200).send("true");
};

exports.getId = (req, res, next) => {
  Estados.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.getUp = (req, res, next) => {
  var id = req.params.id;
  Estados.findById(id, function(err, Estados) {
    if (err) {
      throw err;
    }
    Estados.estado = !Estados.estado;
    Estados.save(function() {
      res.redirect("/estados");
    });
  });
  var request = require("request");
  request("http://192.168.2.108:80/server", function(error, response, body) {
    //request("http://192.168.137.79:80/server", function(error, response, body) {
    //console.log("error:", error); // Print the error if one occurred
    //console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    //console.log("body:", body); // Print the HTML for the Google homepage.
  });
};
exports.postNome = (req, res, next) => {
  Estados.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        nome: req.body.nome
      }
    },
    function(err, Estados) {
      if (err) {
        throw err;
      }
      Estados.save()
        .then(x => {
          res.status(201).send({
            message: "Atualizado com sucesso"
          });
        })
        .catch(e => {
          res.status(400).send({
            message: "Falha atualização",
            data: e
          });
        });
    }
  );
};

exports.post = (req, res, next) => {
  var estados = new Estados(req.body);
  estados
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

exports.getConsumo = (req, res, next) => {
  //var id = req.params;
  var id = req.body;
  var id1 = id.nome[0];
  var consumo1 = id.consumo[0];
  console.log(id);
  console.log(id1);
  console.log(consumo1);
  res.status(200).send(id);
};
exports.delete = (req, res, next) => {
  //Product.findOneAndRemove(req.params.id).then(x => {
  // console.log(req.body.nome);
  //res.status(200).send("OKS");
  Estados.findOneAndDelete({ nome: req.body.nome })
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
