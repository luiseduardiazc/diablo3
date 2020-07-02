import { post } from 'axios'

const clientId = process.env.VUE_APP_CLIENT_ID
const secretId = process.env.VUE_APP_SECRET_ID

const region = 'eu'

const API_URL = `https://${region}.battle.net/oauth/token`

const getToken = () => {
  const body = new FormData()
  body.append('grant_type', 'client_credentials')

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    auth: { username: clientId, password: secretId }
  }
  return post(API_URL, body, config)
}

export {
  getToken
}
