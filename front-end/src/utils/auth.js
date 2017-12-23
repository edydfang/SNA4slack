import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  const token = Cookies.get(TokenKey)
  return token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
