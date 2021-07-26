require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.json());

app.get('/api/:id/:di', (req, res) => {
    console.log("params",req.params);
    console.log("query",req.query);
    console.log("body",req.body);
    console.log("--------get--------");
    res.send();
})

app.post('/api/:id/:di', (req, res) => {
    console.log("params",req.params);
    console.log("query",req.query);
    console.log("body",req.body);
    console.log("--------post--------");
    res.send();
})

app.put('/api/:id/:di', (req, res) => {
    console.log("params",req.params);
    console.log("query",req.query);
    console.log("body",req.body);
    console.log("--------put--------");
    res.send();
})

app.patch('/api/:id/:di', (req, res) => {
    console.log("params",req.params);
    console.log("query",req.query);
    console.log("body",req.body);
    console.log("-------patch---------");
    res.send();
})

app.delete('/api/:id/:di', (req, res) => {
    console.log("params",req.params);
    console.log("query",req.query);
    console.log("body",req.body);
    console.log("-------delete---------");
    res.send();
})



const port = 6666;

app.listen(port, () => console.log(`rest Server running on port ${port}`));





