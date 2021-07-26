const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.use(express.static(__dirname + '/public/'));
//app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.get(/.*/, (req, res) => {
	console.log(666);
	res.redirect('/public/')

});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

