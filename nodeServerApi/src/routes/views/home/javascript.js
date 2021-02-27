function createTabela() {
  fetch("http://localhost:3000/estados")
    .then(resposta => {
      return resposta.json();
    })
    .then(resposta => {
      var t01 = document.getElementById("t01");
      //var body = document.getElementsByTagName("body")[0];
      var tbl = document.getElementById("t01");
      var tblBody = document.createElement("tbody");

      console.log(Object.keys(resposta).length);
      for (var j = 0; j < Object.keys(resposta).length; j++) {
        var row = document.createElement("tr");

        var ptn = document.createElement("td");
        var qtdTd = "td" + j;
        ptn.setAttribute("id", qtdTd);
        var ptnText = document.createTextNode(resposta[j].nome);
        ptn.appendChild(ptnText);
        row.appendChild(ptn);
        var cns = document.createElement("td");
        var qtdTd2 = "td" + j;
        ptn.setAttribute("id", qtdTd2);
        var cnsText = document.createTextNode(resposta[j].ponto);
        cns.appendChild(cnsText);
        row.appendChild(cns);
        var std = document.createElement("td");
        var btnLabel = document.createElement("label");
        var btnInput = document.createElement("input");
        var btnSpan = document.createElement("span");
        var btnDiv = document.createElement("div");
        var btnDivText = document.createTextNode(resposta[j].estado);
        btnLabel.setAttribute("class", "switch");
        btnInput.setAttribute("id", "btn");
        var num = "btn" + j;
        btnInput.setAttribute("value", num);
        btnInput.setAttribute("type", "checkbox");
        var ident = "Div" + j;
        btnInput.setAttribute("onclick", "ativ(this,'" + ident + "')");
        btnSpan.setAttribute("class", "slider");
        btnDiv.setAttribute("id", ident);
        var stdText = document.createTextNode(resposta[j].estado);
        btnLabel.appendChild(btnInput);
        btnLabel.appendChild(btnSpan);

        std.appendChild(btnLabel);
        btnDiv.appendChild(btnDivText);
        std.appendChild(btnDiv);
        row.appendChild(std);

        tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
    });
}
function resultDisp() {
  fetch("http://localhost:3000/estados")
    .then(resposta => {
      return resposta.json();
    })
    .then(resposta => {
      var estado = document.getElementById("linha");
      var td01 = document.getElementById("td1");
      var td02 = document.getElementById("td2");
      var div01 = document.getElementById("Div0");
      var btn = document.getElementById("btn");

      td01.innerHTML = resposta[0].nome;
      td02.innerHTML = resposta[0].ponto;
      div01.innerHTML = resposta[0].estado;
      btn.checked = resposta[0].estado;
    });
}
function ativ(bt, dv) {
  fetch("http://localhost:3000/estados/5d9e70ad8e2ced3560515f43")
    .then(resposta => {
      return resposta.json();
    })
    .then(resposta => {
      var x = document.getElementById(dv);
      x.innerHTML = resposta[0].estado;
    });
}
function myFunction(bt, dv) {
  var x = document.getElementById(dv);

  if (x.innerHTML === "OFF") {
    x.innerHTML = "ON ";
  } else {
    x.innerHTML = "OFF";
  }
}
function config() {
  window.location = "./conf";
}
function statusServer() {
  window.location = "./statusServer";
}
function entrar() {
  window.location = "./add";
}
