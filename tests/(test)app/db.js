const sqlite3 = require('sqlite3')

const dbsource = 'db.sqlite'

let db = new sqlite3.Database(dbsource, (err) => {
    if (err) {
        console.error(err.message)
        throw err;  // TODO: useful error handling here...
    }
});

module.exports = db