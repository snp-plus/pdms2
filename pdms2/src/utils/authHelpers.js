import { get } from 'lodash'
import { getItem } from '../utils/localStorage'

export const getHeaders = () => {
  const auth = getItem('auth')
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  
  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'JWT ' + token
  }

  return headers
}

export const getErrorMessage = error => {
  const data = get(error, 'data', null)
  if (data) {
    let message
    for (let key in data) {
      message = data[key].toString()
      message = message.replace('This field', key)
      message = message.replace('this value', key)
    }
    message = message.charAt(0).toUpperCase() + message.slice(1)
    return message
  }
  return ''
}