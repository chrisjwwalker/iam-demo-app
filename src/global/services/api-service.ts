import axios from 'axios'

export const getWeatherDataFor = (location: string, token: string): Promise<any> => {
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return axios.get(`http://localhost:8008/iam-demo/api/weather?location=${location}`, reqConfig)
}
