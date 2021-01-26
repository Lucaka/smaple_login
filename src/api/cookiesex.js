
import Cookies from 'js-cookie'

export function getToken(token,value) {
  return Cookies.get(token,value)
}

export function setToken(token,value) {
  return Cookies.set(token,value)
}

export function removeToken(token) {
  return Cookies.remove(token)
}