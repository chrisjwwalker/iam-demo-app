import express from 'express'
import {homeHandler, redirectHandler, weatherHandler} from './handlers'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT || '8000'

app.use(cookieParser())

app.get('/iam-demo/home', homeHandler)
app.get('/iam-demo/redirect', redirectHandler)
app.get('/iam-demo/weather-for', weatherHandler)

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`)
})