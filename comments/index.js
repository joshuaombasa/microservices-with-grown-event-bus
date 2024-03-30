const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comment', (request, response) => {
    response.send(commentsByPostId[request.params.id] || [])
})

app.post('/posts/:id/comment', async (request, response) => {
    const commentId = randomBytes(4).toString('hex')
    const content = request.body.content

    const comments = commentsByPostId[request.params.id] || []
    comments.push({ id: commentId, content, status: 'pending' })

    commentsByPostId[request.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: request.params.id,
            status: 'pending'
        }
    })

    response.status(201).send(comments)
})

app.post('/events', async(request, response) => {
    console.log('Recieved event', request.body.type)
    const { type, data } = request.body

    if (type === 'CommentModerated') {
        const { postId, id, status,content } = data
        const comments = commentsByPostId[postId]
        const commentToUpdate = comments.find(comment => comment.id === id)
        commentToUpdate.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        })
    }
    response.send({})
})

app.listen(4001, () => {
    console.log(`server running on port 4001`)
})