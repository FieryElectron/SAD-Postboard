const port = 5000;

const Joi = require("joi");
const express = require("express");
const cors = require('cors');

const app = express();

const router = require('./controller/router')

const dbFileName = 'db.sqlite'

const Post = require('./models/post')

app.use(express.json());
app.use(cors());
app.use('/api', router)

app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get('/api/redirect/', (req, res) => {
	res.redirect('/about');
});

app.get('/api/courses/', (req, res) => {

	const page = req.query.page;
	const limit = req.query.limit;

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	console.log(page, limit);
	console.log(startIndex, endIndex);

	new Post().getAll("t1", (err, rows) => {
		if (err) return console.error(err.message);
		res.send(rows);
	});
});

// app.get('/api/courses', (req, res) => {
// 	new Post().getAll("t1", (err, rows) => {
// 		if (err) return console.error(err.message);
// 		res.send(rows);
// 	});
// });

app.post('/api/courses', (req, res) => {
	const { error } = validateCourse(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	new Post(req.body.text).insertTo("t1", (err, obj) => {
		if (err) return console.error(err.message);
		
		new Post().getAll("t1", (err, rows) => {
			if (err) return console.error(err.message);
			res.send(rows);
		});
	});

});


app.put('/api/courses', (req, res) => {

	new Post(req.body.text, req.body.id).updateById("t1", (err, obj) => {
		if (err) return console.error(err.message);

		new Post().getAll("t1", (err, rows) => {
			if (err) return console.error(err.message);
			res.send(rows);
		});
	
		//console.log(obj);
	});

	//res.send("555");

	// const course = courses.find(c => c.id === parseInt(req.params.id));
	// if(!course){
	// 	res.status(404).send("Not found!");
	// 	return;
	// }
	

	// const { error } = validateCourse(req.body);

	// if(error){
	// 	res.status(400).send(error.details[0].message);
	// 	return;
	// }

	// course.name = req.body.name;

	// res.send(course);


});

app.delete('/api/courses/:id', (req, res) => {

	new Post("", parseInt(req.params.id)).deleteById("t1", (err, result) => {
		if(err) {
			console.log(err);
		}
		res.send(result);
		console.log(`Row(s) deleted ${result}`);
	});

	// const course = courses.find(c => c.id === parseInt(req.params.id));
	// if(!course){
	// 	res.status(404).send("Not found!");
	// 	return;
	// }

	// const index = courses.indexOf(course);
	// courses.splice(index, 1);

	// res.send(course);
});

function validateCourse(course){
	const schema = {
		text: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}





app.listen(port, ()=> console.log(`Listening on port ${port} ...`));

/*
const dbFileName = 'db.sqlite'

const Database = require('./database/sqlite3')
const Post = require('./models/post')

new Post("77").insertTo("t1", (err, obj) => {
	if (err){
		console.error(err.message);
	}
	//console.log(obj);
});

new Post("", 1).getById("t1", (err, rows) => {
	if (err) console.error(err.message);
	console.log(rows);
});

new Database(dbFileName).getById("t1", 3, (err, rows) => {
	if (err) console.error(err.message);
	console.log(rows);
});

new Post().getAll("t1", (err, rows) => {
	if (err) console.error(err.message);
	console.log(rows);
});

new Post("999999", 1).updateById("t1", (err, obj) => {
	if (err){
		console.error(err.message);
	}
	//console.log(obj);
});

new Post("", 6).deleteById("t1", (err, res) => {
	if(err) {
		console.log(err);
	}
	console.log(`Row(s) deleted ${res}`);
});


new Database(dbFileName).getAllTables((err, rows) => {
	if (err) return console.error(err.message);
	rows.forEach((table) => {
		new Database(dbFileName).dropTable(table.name);
	});
});

new Database(dbFileName).getAll("t1", (err, rows) => {
	if (err) console.error(err.message);
	console.log(rows);
});

setTimeout(function(){ 
	new Database(dbFileName).getAll("t1", (err, rows) => {
		if (err) console.error(err.message);
		console.log(rows);
	});
}, 1000);
*/




