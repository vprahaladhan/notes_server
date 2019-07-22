const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(express.static('build'))

app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')

const password = 'admin'

const url =
  `mongodb+srv://admin:admin@learn-mern-stack-nreww.gcp.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: false,
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
        mongoose.connection.close()
    })
})

app.get('/api/notes/:id', (request, response) => {
    response.json(notes.find(note => note.id == request.params.id))
})

app.post('/api/notes', (request, response) => {
    note.save().then(response => {
        console.log('note saved!')
        response.json(request.body)
        mongoose.connection.close()
    })
})

app.put('/api/notes/:id', (request, response) => {
    const note = notes.find(note => note.id == request.params.id)
    note.content = request.body.content
    note.important = request.body.important
    response.status(204).end()
})

app.delete('/api/notes/:id', (request, response) => {
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