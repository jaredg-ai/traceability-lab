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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})


const port = process.env.PORT || 4343

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`running on port: ${port}`))