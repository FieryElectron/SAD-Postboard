const sqlite = require('better-sqlite3');

class User{
    constructor(username, password, description) {
        this.username = username;
        this.password = password;
        this.description = description;
    }
}

class UsersDatabase{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new sqlite(this.DataBaseName);
    }

    CreateTableIfNotExists(){
        const CreateTable = this.db.prepare('CREATE TABLE IF NOT EXISTS '+this.TableName+' (username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, description TEXT NOT NULL)');
        return CreateTable.run();
    }

    DropTableIfExists(){
        const DropTable = this.db.prepare(`DROP TABLE IF EXISTS ${this.TableName}`);
        return DropTable.run();
    }

    GetAllTables(){
        const GetAllTables = this.db.prepare("select name from sqlite_master where type='table' AND name!='sqlite_sequence'");
        return GetAllTables.all();
    }

    Insert(username, password, description){
        const Insert = this.db.prepare(`INSERT INTO ${this.TableName} (username, password, description) VALUES (?,?,?)`);

        try{
            const res = Insert.run(username, password, description);
            return res;
        }catch(e){
            return {exception: e.message};
        }
    }

    Update(username, password, description){
        const UpdateByUsername = this.db.prepare(`UPDATE ${this.TableName} SET password=? , description=? WHERE username=?`);
        return UpdateByUsername.run(password, description, username);
    }

    Get(username){
        const GetByUsername = this.db.prepare(`SELECT * FROM ${this.TableName} WHERE username =?`);
        return GetByUsername.get(username);
    }

    Delete(username){
        const DeleteByUsername = this.db.prepare(`DELETE FROM ${this.TableName} WHERE username =?`);
        return DeleteByUsername.run(username);
    }

    GetAll(){
        const GetAll = this.db.prepare(`SELECT * FROM ${this.TableName}`);
        return GetAll.all();
    }

    // RunRawAll(statement){
    //     return this.db.prepare(statement).all();
    // }

}

class UsersMapper{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new UsersDatabase(this.DataBaseName, this.TableName );
    }

    create(user){
        this.db.CreateTableIfNotExists();
        return this.db.Insert(user.username, user.password, user.description);
    }

    update(user){
        this.db.CreateTableIfNotExists();
        return this.db.Update(user.username, user.password, user.description);
    }

    get(user){
        this.db.CreateTableIfNotExists();
        const res = this.db.Get(user.username);
        if(res == null){
            return null;
        }
        return new User(res.username, res.password, res.description);
    }

    getAll(){
        this.db.CreateTableIfNotExists();
        return this.db.GetAll(this.TableName);
    }

    delete(user){
        this.db.CreateTableIfNotExists();
        return this.db.Delete(user.username);
    }

    cleanTable(){
        this.db.DropTableIfExists();
        this.db.CreateTableIfNotExists();
    }

    getAllTables(){
        return this.db.GetAllTables();
    }

    // getByCondition(field, operator, value){
    //     return this.db.RunRawAll(`SELECT * FROM ${this.TableName} WHERE `+field+" "+operator+" "+value);
    // }
}

// const DataBaseName = "db.sqlite";
// const TableName = "UsersTable";
// const usersMapper = new UsersMapper(DataBaseName, TableName);


// const res = usersMapper.create(new User("mov", "sad","Hello!"));

// if(!res.exception){
//     console.log("User created!");
// }else{
//     if(res.exception.indexOf('UNIQUE constraint failed') == 0){
//         console.log("User Exists!");
//     }else{
//         console.log("Failed!");
//     }
// }

// const res = usersMapper.update(new User("jmp","123","456!"));
// if(res.changes){
//     console.log("User updated!");
// }else{
//     console.log("Failed no such user!");
// }


// const user = usersMapper.get(new User("jmp","",""));

// if(user){
//     console.log(user);
// }else{
//     console.log("Cant find user!");
// }

// const res = usersMapper.delete(new User("jmpass"));

// if(res.changes){
//     console.log("User deleted!");
// }else{
//     console.log("User delete failed");
// }

//usersMapper.cleanTable();

// console.log(usersMapper.getAllTables());
// console.log(usersMapper.getAll());


//------------------------------------------------

class Post{
    constructor(id, username, content, timestamp) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.timestamp = timestamp;
    }
}

class PostsDatabase{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new sqlite(this.DataBaseName);
    }

    DropTableIfExists(){
        const DropTable = this.db.prepare(`DROP TABLE IF EXISTS ${this.TableName}`);
        return DropTable.run();
    }

    GetAllTables(){
        const GetAllTables = this.db.prepare("select name from sqlite_master where type='table' AND name!='sqlite_sequence'");
        return GetAllTables.all();
    }

    CreateTableIfNotExists(){
        const CreateTable = this.db.prepare('CREATE TABLE IF NOT EXISTS '+this.TableName+' (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, content TEXT NOT NULL, timestamp INTEGER NOT NULL)');
        return CreateTable.run();
    }

    Insert(username, content, timestamp){
        const Insert = this.db.prepare(`INSERT INTO ${this.TableName} (username, content, timestamp) VALUES (?,?,?)`);
        return Insert.run(username, content, timestamp);
    }

    Update(id, username, content, timestamp){
        const UpdateById = this.db.prepare(`UPDATE ${this.TableName} SET username =? , content =? , timestamp =? WHERE id =?`);
        return UpdateById.run(username, content, timestamp, id);
    }

    Get(id){
        const GetById = this.db.prepare(`SELECT * FROM ${this.TableName} WHERE id =?`);
        return GetById.get(id);
    }

    Delete(id){
        const DeleteById = this.db.prepare(`DELETE FROM ${this.TableName} WHERE id =?`);
        return DeleteById.run(id);
    }

    GetAll(){
        const GetAll = this.db.prepare(`SELECT * FROM ${this.TableName}`);
        return GetAll.all();
    }

    RunRawAll(statement){
        return this.db.prepare(statement).all();
    }

}



class PostsMapper{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new PostsDatabase(this.DataBaseName, this.TableName );
    }

    create(post){
        this.db.CreateTableIfNotExists();
        return this.db.Insert(post.username, post.content, post.timestamp);
    }

    update(post){
        this.db.CreateTableIfNotExists();
        return this.db.Update(post.id, post.username, post.content, post.timestamp);
    }

    get(post){
        this.db.CreateTableIfNotExists();
        const res = this.db.Get(post.id);
        if(res == null){
            return null;
        }
        return new Post(res.id, res.username, res.content, res.timestamp);
    }

    getAll(){
        this.db.CreateTableIfNotExists();
        return this.db.GetAll(this.TableName);
    }

    delete(post){
        this.db.CreateTableIfNotExists();
        return this.db.Delete(post.id);
    }

    cleanTable(){
        this.db.DropTableIfExists();
        this.db.CreateTableIfNotExists();
    }

    getAllTables(){
        return this.db.GetAllTables();
    }

    getByCondition(field, operator, value){
        this.db.CreateTableIfNotExists();
        return this.db.RunRawAll(`SELECT * FROM ${this.TableName} WHERE `+field+" "+operator+" "+value);
    }
}

const DataBaseName = "db.sqlite";
const TableName = "PostsTable";

const postsMapper = new PostsMapper(DataBaseName, TableName);

// const res = postsMapper.create(new Post(0, "1", "11", 10));
// if(res.changes){
//     console.log("Post created!");
// }else{
//     console.log("Post create failed");
// }

// const res = postsMapper.update(new Post(10, "2", "2", 666));
// if(res.changes){
//     console.log("Post updated!");
// }else{
//     console.log("Post update failed");
// }

// const post = postsMapper.get(new Post(9));
// console.log(post);

// const res = postsMapper.delete(new Post(6));
// if(res.changes){
//     console.log("Post deleted!");
// }else{
//     console.log("Post delete failed");
// }


// const res = postsMapper.getByCondition("timestamp","<","1100");
// console.log(res);

//postsMapper.cleanTable();

const allPosts = postsMapper.getAll();
console.log(allPosts);




// console.log(postsMapper.getAllTables());



