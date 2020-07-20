import { Request, Response } from 'express'
import { buildAuthProviderUrl, getAccessToken } from '../global/services/auth-service'

export const homeHandler = (req: Request, res: Response) => {
  const providerUrl = buildAuthProviderUrl(
    process.env.OKTA_AUTHORISE_ROUTE,
    process.env.APPLICATION_ID,
    process.env.APPLICATION_SCOPE,
    process.env.APPLICATION_RESPONSE_TYPE
  )

  return res.redirect(providerUrl)
}

export const redirectHandler = (req: Request, res: Response) => {
  const { query } = req
  const { code } = query

  return getAccessToken(code.toString()).then(token => {
    return res.json({
      token
    })
  }).catch(e => {
    console.log(e)
    return res.json({

    })
  })
};