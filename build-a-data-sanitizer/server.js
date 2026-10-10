import express from 'express'
import { inputCleaner, inputValidator } from './middleware.js'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/form')
})

app.use(express.static('public'))

app.get('/form', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html')
})

app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  res.send(`Username: ${req.body.username}, Comment: ${req.body.comment}`)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})