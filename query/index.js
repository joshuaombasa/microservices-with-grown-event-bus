const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {

    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] }
    } else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        post.comments.push({ id, content, status })
    } else if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)
        comment.status = status
        comment.content = content
    }
}


app.get('/posts', (request, response) => {
    response.send(posts)
})

app.post('/events', (request, response) => {
    const { type, data } = request.body


    handleEvent(type, data)
    response.send({})
})

app.listen(4002, async() => {
    console.log('server running on port 4002')

    const res = await axios.get('http://localhost:4005/events')

    for (let event of res.data) {
        console.log('Processing event', event.type)
        handleEvent(event.type, event.data)
    }

})