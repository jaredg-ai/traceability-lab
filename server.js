const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: '513d2bb205234c3489594eba7d5f0056',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express()
app.use(express.json())
app.use('/style', express.static('./public/style.css'))

let movies = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/movie', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = movies.findIndex((movieName) => {
        movieName === name
    })

    try {
        if (index === -1 && name !== '') {
            movies.push(name)
            rollbar.log('movie added successfully', {author: 'jared', type: 'manual'})
            res.status(200).send(movies)
        } else if (name === '') {
            rollbar.error('no name given')
            res.status(400).send('that movie is already there')
        }
    } catch (err) {
        rollbar.error(err)
    }
})

app.delete('/api/movie/:movieName', (req, res) => {
    let existingMovieName = req.params.movieName
    for (let i = 0; i < movie.length; i++) {
        if (movie[i].movieName === existingMovieName) {
            movie.splice(i, 1)
            res.status(200).send('movie deleted')
            return
        }
    }
    res.status(400).send('movie not found')
})

const port = process.env.PORT || 4343

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`running on port: ${port}`))