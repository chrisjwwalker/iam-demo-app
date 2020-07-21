import { Request, Response } from 'express'
import { buildAuthProviderUrl, getAccessToken } from '../global/services/auth-service'
import { getWeatherDataFor } from '../global/services/api-service'
import jwt from 'jsonwebtoken'
import path from 'path'

export const homeHandler = (req: Request, res: Response) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname + '/views/home.html'));
}

export const loginHandler = (req: Request, res: Response) => {
  const providerUrl = buildAuthProviderUrl(
    process.env.OKTA_AUTHORISE_ROUTE,
    process.env.APPLICATION_ID,
    process.env.APPLICATION_SCOPE,
    process.env.APPLICATION_RESPONSE_TYPE
  )

  return res
    .redirect(providerUrl)
}

export const redirectHandler = (req: Request, res: Response) => {
  const { query } = req
  const { code } = query

  return getAccessToken(code.toString()).then(token => {
    return res
      .cookie('user', token.access_token)
      .redirect('/iam-demo/weather-for?locale=london')
  }).catch(e => {
    console.log(e)
    return res.json({  })
  })
}

export const weatherHandler = (req: Request, res: Response) => {
  const token = req.cookies.user
  if(token === null) {
    return res
      .redirect('/iam-demo/home')
  }

  const { locale } = req.query
  if(!locale) {
    return res
      .status(200)
  }

  const decodedToken: any = jwt.decode(token)

  return getWeatherDataFor(locale.toString(), token).then(resp => {
    if(resp.status !== 200) {
      return res
        .redirect('/iam-demo/login')
    }

    return res
      .status(200)
      .render('weather', { ...resp.data, user: decodedToken.upn })
  }).catch(() => {
    return res
      .redirect('/iam-demo/login')
  })
}
