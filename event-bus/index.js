const expess = require('express')
const axios = require('axios')
const app = expess()

app.use(expess.json())


app.post('/events', async(request,response) => {
    const event = request.body

    await axios.post('http://localhost:4000/events',event)
    await axios.post('http://localhost:4001/events',event)
    await axios.post('http://localhost:4002/events',event)
    await axios.post('http://localhost:4003/events',event)

    response.send({status: 'OK'})
})

app.listen(4005, () => {
    console.log('Event bus listening on 4005')
})