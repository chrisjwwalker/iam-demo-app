import { Request, Response } from 'express'
import { buildAuthProviderUrl, getAccessToken } from '../global/services/auth-service'
import { getWeatherDataFor } from '../global/services/api-service'
import jwt from 'jsonwebtoken'

export const homeHandler = (req: Request, res: Response) => {
  const providerUrl = buildAuthProviderUrl(
    process.env.OKTA_AUTHORISE_ROUTE,
    process.env.APPLICATION_ID,
    process.env.APPLICATION_SCOPE,
    process.env.APPLICATION_RESPONSE_TYPE
  )

  return res
      .redirect(providerUrl)
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

  return getWeatherDataFor(locale.toString(), token).then(data => {
    return res
        .status(200)
        .json({
          ...data,
          user: decodedToken.upn
        })
  })
}

export const redirectHandler = (req: Request, res: Response) => {
  const { query } = req
  const { code } = query

  return getAccessToken(code.toString()).then(token => {
    return res
        .cookie('user', token.access_token)
        .json({ token })
  }).catch(e => {
    console.log(e)
    return res.json({  })
  })
};