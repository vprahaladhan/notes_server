const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const Note = require('./models/note')

const url = 'mongodb+srv://admin:admin@learn-mern-stack-nreww.gcp.mongodb.net/note-app?retryWrites=true&w=majority'

console.log('connecting to', url)

const mongoose = require('mongoose')

console.log(url)
mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Notes App!</h1>')
})
  
app.get('/api/notes', (req, res) => {
    // Note.find({}).then(notes => res.json(notes.map(note => note.toJSON())))
    console.log("Fetching all notes...")
    Note.find({}).then(notes => {
        console.log(notes)
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => res.json(note))
})

app.post('/api/notes', (req, res) => {
    const note = new Note({
        content: req.body.content,
        date: new Date(),
        important: false,
    })
    note.save().then(newNote => res.json(newNote.toJSON()))
})

app.put('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        note.important = !note.important
        note.save().then(newNote => res.json(newNote.toJSON()))
    })
})

app.delete('/api/notes/:id', (req, res) => {
    // notes = notes.filter(note => note.id != request.params.id)
    // response.status(204).end()
})

const PORT = process.env.PORT
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