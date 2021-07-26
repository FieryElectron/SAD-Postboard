const db = require('../db')

module.exports = class Post {
  constructor(title, text, id) {
    id
      ? this.id = id
      : this.id = Math.random().toString(36).substr(2, 9) // TODO: Choose a better UUID generator

    this.title = title
    this.text = text
  }

  static findById(id, callback) {
    var sql = "SELECT id, title, text FROM post WHERE id = ?"
    var params = [id]
    db.get(sql, params, (err, row) => {
      if (err) {
        throw err  // TODO: useful error handling here...
        return
      }
      row
        ? callback(new Post(row.title, row.text, row.id))
        : callback(null)
    })
  }

  static deleteById(id, callback) {
    throw { name: "NotYetImplementedError", message: "Too lazy to implement..." };
  }

  // TODO: insert should also call a callback and forward id
  insert() {
    var sql = 'INSERT INTO post (id, title, text) VALUES (?,?,?)'
    var params = [this.id, this.title, this.text]
    db.run(sql, params, function (err, result) {
      if (err) {
        throw err  // TODO: useful error handling here...
        return
      }
    });
  }

  update(callback) {
    throw { name: "NotYetImplementedError", message: "Too lazy to implement..." };
  }
}
