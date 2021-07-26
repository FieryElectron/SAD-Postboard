const Database = require('../database/sqlite3')

const dbFileName = 'db.sqlite'

module.exports = class Post {
    constructor(text, id) {
        text?this.text = text:null;
        id?this.id = id:null;

        this.database = new Database(dbFileName);
    }
 
    insertTo(tableName, callback, obj){
        if(!obj){
            obj = this;
        }
        
        obj.database.sqlite.get('select name from sqlite_master where type="table" AND name="'+tableName+'"',  (err, row ) => {
            if (err){
                callback(err, obj); 

                obj.sqlite.closeDatabase();
                return;
            }
            
            if(!row){
                obj.database.sqlite.run('CREATE TABLE '+tableName+' (id INTEGER PRIMARY KEY AUTOINCREMENT,text TEXT NOT NULL, createdAt TEXT NOT NULL);', (err) => {
                    if (err){
                        callback(err, obj);
                        return;
                    }
                    console.log("Table "+tableName+" Created");
                    obj.database.sqlite.run('INSERT INTO '+ tableName +' (text, createdAt) VALUES (?,?)',obj.text, new Date().toString(), (err) => {
                        callback(err, obj);
                        console.log("Data "+obj.text+" Inserted");
                        obj.database.closeDatabase();
                    });
                });
            }else{
                obj.database.sqlite.run('INSERT INTO '+ tableName +' (text, createdAt) VALUES (?,?)',obj.text, new Date().toString(), (err) => {
                    callback(err, obj);
                    console.log("Data "+obj.text+" Inserted");
                    obj.database.closeDatabase();
                });
            }
        });
    }

    updateById(tableName, callback, obj){
        if(!obj){
            obj = this;
        }

        this.database.sqlite.run('UPDATE '+tableName+' SET text =? WHERE id =?', obj.text, obj.id, (err) => {
            callback(err, obj);
            obj.database.closeDatabase();
        });
    }

    deleteById(tableName, callback, obj){
        if(!obj){
            obj = this;
        }

        this.database.sqlite.run(`DELETE FROM `+tableName+` WHERE id =?`, obj.id, function(err) {
            callback(err,`${this.changes}`);
            obj.database.closeDatabase();
        });


    }

    getById(tableName, callback, obj){
        if(!obj){
            obj = this;
        }
        this.database.sqlite.get('SELECT * FROM '+tableName+' WHERE id='+obj.id ,(err, row) => {
            callback(err, row);
            obj.database.closeDatabase();
        });
    }

    getAll(tableName, callback, obj){
        if(!obj){
            obj = this;
        }
        this.database.sqlite.all('SELECT * FROM "'+tableName+'"' ,(err, rows) => {
            callback(err, rows);
            obj.database.closeDatabase();
        });
    }




}
