import express from 'express'
import {homeHandler, redirectHandler, weatherHandler, loginHandler} from './handlers'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT || '8000'

app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug')

app.get('/iam-demo/home', homeHandler)
app.get('/iam-demo/login', loginHandler)
app.get('/iam-demo/redirect', redirectHandler)
app.get('/iam-demo/weather-for', weatherHandler)

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`)
})