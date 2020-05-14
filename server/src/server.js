import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from './config/configKeys'
import db from './models'
import apis from './routes/router'
const cors = require('cors')
const app = express()

// Use body-parser and cookie parser for use post data
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

db.sequelize.sync()
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch(err => {
    console.log("something went wrong with db setup.", err);
  })

// import API for use
apis(app);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

const port = process.env.PORT || 8000 // set our port

// Run server on given port
const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port
  // eslint-disable-next-line no-console
  console.log('😀 🙌 app listening at http://%s:%s 🙌 😀', host, port)
})
