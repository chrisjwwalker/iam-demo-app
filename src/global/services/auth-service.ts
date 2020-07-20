import FormData from 'form-data'
import axios from 'axios'

export const buildAuthProviderUrl = (authoriseRoute: string, clientId: string, scope: string, responseType: string): string => {
  return `${authoriseRoute}?client_id=${clientId}&scope=${scope}&response_type=${responseType}`
}

export const getAccessToken = (code: string): Promise<any> => {
  var bodyFormData = new FormData();
  bodyFormData.append("client_id", process.env.APPLICATION_ID)
  bodyFormData.append("scope", process.env.APPLICATION_SCOPE)
  bodyFormData.append("code", code)
  bodyFormData.append("redirect_uri", "http://localhost:8000/iam-demo/redirect")
  bodyFormData.append("grant_type", "authorization_code")
  bodyFormData.append("client_secret", process.env.APPLICATION_SECRET)

  const tokenRoute = process.env.OKTA_TOKEN_ROUTE

  return axios.post(tokenRoute, bodyFormData).then(resp => {
    return resp.data
  })
}
