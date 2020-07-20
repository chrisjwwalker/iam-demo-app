import express from 'express'
import { weatherDataHandler } from './handlers'

const app = express()
const port = process.env.PORT || '8008'

app.get('/iam-demo/api/weather', weatherDataHandler)

app.listen(port, err => {
  if (err) return console.error(err)
  return console.log(`Server is listening on ${port}`)
});