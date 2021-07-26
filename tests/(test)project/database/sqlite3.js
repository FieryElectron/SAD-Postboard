const sqlite3 = require('sqlite3').verbose();

//const dbFileName = 'db.sqlite'

module.exports = class Database {

	constructor(DatabaseName) {
		this.sqlite = new sqlite3.Database(DatabaseName, (err) => {
			if (err) {
				return console.error(err.message);
			} 
			//console.log('Connected to the database.');
		});
	}

	getAllTables(callback){
		this.sqlite.all("select name from sqlite_master where type='table'", (err, rows) => {
			callback(err, rows);
			this.closeDatabase();
		});
	}

	// createTable(table){
	// 	this.sqlite.run('CREATE TABLE '+table+' (id INTEGER PRIMARY KEY,text TEXT NOT NULL);', (err) => {
	// 		if (err) return console.error(err.message);
 //            console.log("Table "+table+" Created");
 //            this.closeDatabase();
	// 	});
	// }

	dropTable(table){
		this.sqlite.run('DROP TABLE '+table, (err) => {
			if (err) return console.error(err.message);
            console.log("Table "+table+" Dropped");
			this.closeDatabase();
		});
	}

	getAll(table, callback){
		this.sqlite.all('SELECT * FROM '+table, (err, rows) => {
            callback(err, rows);
			this.closeDatabase();
		});
	}


	getById(table, id, callback){
		this.sqlite.get('SELECT * FROM '+table+' WHERE id='+id, (err, row) => {
            callback(err, row);
			this.closeDatabase();
		});
	}

	closeDatabase(){
		if(this.sqlite){
			this.sqlite.close((err) => {
				if (err) return console.error(err.message);
				//console.log('Close the database connection.');
			});
		}
	}

}
