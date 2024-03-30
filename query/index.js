const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const posts = {}


app.get('/posts', (request, response) => {
    response.send(posts)
})

app.post('/events', (request, response) => {
    const { type, data } = request.body

    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] }
    } else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    console.log(posts)
    response.send({})
})

app.listen(4002, () => {
    console.log('server running on port 4002')
})