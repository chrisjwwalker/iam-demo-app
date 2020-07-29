import axios from 'axios'
import qs from 'querystring'
import exp from 'constants'

export const buildAuthProviderUrl = (authoriseRoute: string, clientId: string, scope: string, responseType: string): string => {
  return `${authoriseRoute}?client_id=${clientId}&scope=${scope}&response_type=${responseType}`
}

export const getAccessToken = (code: string): Promise<any> => {
  const requestBody = {
    client_id: process.env.APPLICATION_ID,
    scope: process.env.APPLICATION_SCOPE,
    code,
    redirect_uri: 'http://localhost:8000/iam-demo/redirect',
    grant_type: 'authorization_code',
    client_secret: process.env.APPLICATION_SECRET
  }

  const tokenRoute = process.env.OKTA_TOKEN_ROUTE

  return axios.post(tokenRoute, qs.encode(requestBody)).then(resp => {
    return resp.data
  })
}

export const getClientCredsToken = (): Promise<any> => {
  const oktatokenroute = process.env.OKTA_TOKEN_ROUTE
  const clientId = process.env.APPLICATION_ID
  const clientSecret = process.env.APPLICATION_SECRET

  const requestBody = {
    grant_type: 'client_credentials',
    client_id: process.env.APPLICATION_ID,
    scope: 'ogd/test'
  }

  const requestConfig = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`, 'binary').toString('base64')}`
    }
  }

  return axios.post(oktatokenroute, qs.encode(requestBody), requestConfig).then(resp => {
    return resp.data
  })
}

export const getUserDetails = (accessToken: String): Promise<any> => {
  const userDetailsRoute = process.env.OKTA_USER_DETAILS_ROUTE
  const requestConfig = { headers: { Authorization: accessToken } }

  return axios.get(userDetailsRoute, requestConfig).then(resp => {
    return resp.data
  })
}
