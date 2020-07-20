import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface WeatherData {
  location: string
  temperature_c: number
  temperature_f: number
  humidity: number
  wind_mph: number
  wind_kph: number
  desc: string
  time: string
}

export const weatherDataHandler = (req: Request, res: Response) => {
  const { query, headers } = req
  const { location } = query

  const { authorization: authHeader } = headers

  if(!authHeader) {
    console.log('Missing header')
    console.log(authHeader)
    return res
        .status(403)
        .json({ msg: 'Missing auth header' })
  }

  const token: any = jwt.decode(authHeader.toString().replace('Bearer ', ''));
  if(token === null) {
    console.log('Issue decoding token')
    return res
        .status(403)
        .json({ msg: 'Issue decoding bearer token' })
  }

  console.log(`Authorised as ${token.upn}`)

  const tempC = Math.floor(Math.random() * 20) + 1
  const mph = Math.floor(Math.random() * 15) + 1
  const humidityValue = Math.random()

  const weatherData: WeatherData = {
    temperature_c: tempC,
    desc: "Overcast",
    humidity: parseFloat(humidityValue.toFixed(2)),
    location: location.toString(),
    temperature_f: (tempC * 9/5) + 32,
    time: new Date().toDateString(),
    wind_mph: mph,
    wind_kph: mph * 1.609
  }

  return res
      .status(200)
      .json(weatherData)
};