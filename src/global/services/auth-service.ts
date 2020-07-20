import axios from 'axios'
import qs from 'querystring'

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
