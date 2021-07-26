const express = require('express')
const posts = require('./controller/posts')

const app = express()
const port = 8080

app.use(express.json())
app.use('/api', posts)

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
