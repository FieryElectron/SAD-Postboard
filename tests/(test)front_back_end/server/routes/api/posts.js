const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

let data = []


router.get('/',  (req, res) => {
    res.send(data);
})

// router.get('/', async (req, res) => {
//     const posts = await loadPostsCollection();
//     console.log(data);
//     res.send(await posts/*.find({}).toArray()*/);
// })

router.post('/', async (req, res) => {
    data.push({
        text: req.body.text,
        createdAt: new Date()
    });
    const posts = await loadPostsCollection();
    res.status(201).send();
})

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.pop();
    res.status(200).send();
})



async function loadPostsCollection(){
    return data;
}


module.exports = router;



