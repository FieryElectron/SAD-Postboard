const express = require('express')
const router = express.Router()

const db = require('../db')
var Post = require('../models/post.js')

router.get("/", (req, res, next) => {
    res.json("6666")
})

router.get("/post/:id", (req, res, next) => {
    Post.findById(req.params.id, (obj) => {
        obj
            ? res.json(obj)
            : res.sendStatus(404)
    })
})

router.post("/post", (req, res, next) => {
    if (!req.body.title || !req.body.text) {
        res.sendStatus(400)
        return
    }    
    let p = new Post(req.body.title, req.body.text)
    p.insert()
    res.set('Location', `${req.originalUrl}/${p.id}`);
    res.sendStatus(201)
})

module.exports = router
