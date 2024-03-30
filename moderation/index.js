const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

// app.get('/none', (request, response) => {
//     response.send({})
// })

app.post('/events', async (request, response) => {
    console.log('Recieved event', request.body.type)
    const { type, data } = request.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        })
    }
    
    response.send({})
})

app.listen(4003, () => {
    console.log('server running on port 4003')
})