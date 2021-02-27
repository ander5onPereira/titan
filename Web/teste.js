const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], user: {}, count: 0 }).write();

// Add a post
/*db.get("posts")

  .push({
    id: db
      .get("posts")
      .size()
      .value(),
    title: "TESTE"
  })
  .write();*/

// Set a user using Lodash shorthand syntax
db.set("user.name", "novo").write();

// Increment count
//db.update("count", n => n + 1).write();
const numElemento = db
  .get("posts")
  .size()
  .value();
const numEl = db.get("user.name").value();

const post = db
  .get("posts")
  .find({ id: 1 })
  .value();

/*db.get("posts")
  .remove({ id: 1 })
  .write();
*/
const o = db.get("posts").find();

console.log(numElemento);
console.log(numEl);
console.log(post);
console.log(o);
/*const lowdb = require("lowdb");
const db = lowdb("banco.json");

db.defauts({
  id: [],
  noticias: [],
  usuarios: []
}).write();

db.get("noticias")
  .push({
    id: "1",
    assunto: "crime",
    conteudo: "teste"
  })
  .write();
*/
