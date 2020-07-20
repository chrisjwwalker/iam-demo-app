import express from 'express'
import {homeHandler, redirectHandler} from './handlers'
import * as dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.PORT || '8000'

app.get('/iam-demo/home', homeHandler)
app.get('/iam-demo/redirect', redirectHandler)

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`)
})