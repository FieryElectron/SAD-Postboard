const express = require('express')
const router = express.Router()


router.get("/links", (req, res, next) => {
    res.json(['http://localhost:5000/api/courses/','http://localhost:5000/api/courses/'])
})



module.exports = router