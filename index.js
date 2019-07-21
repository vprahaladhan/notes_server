const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML/CSS is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 4,
        content: "Javascript is powerful",
        date: "2019-05-30T19:20:14.298Z",
        important: false
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
    res.json(notes.find(note => note.id == req.params.id))
})

app.post('/notes', (request, response) => {
    request.body.id = Math.max(...notes.map(note => note.id)) + 1
    notes = notes.concat(request.body)
    response.json(request.body)
})

app.put('/notes/:id', (request, response) => {
    const note = notes.find(note => note.id == request.params.id)
    note.content = request.body.content
    note.important = request.body.important
    response.status(204).end()
})

app.delete('/notes/:id', (request, response) => {
    notes = notes.filter(note => note.id != request.params.id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
})

// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World')
// })

// const port = 3001
// app.listen(port)
// console.log(`Server running on port ${port}`)