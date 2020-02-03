import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  LOGOUT,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  INITIALIZE_STATUS,
}  from '../constants/auth';

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  }
}

export function loginFail(payload) {
  return {
    type: LOGIN_FAIL,
    payload,
  }
}

export function logout(payload) {
  return {
    type: LOGOUT,
    payload,
  }
}

export function registerRequest(payload) {
  return {
    type: REGISTER_REQUEST,
    payload,
  }
}

export function registerSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  }
}

export function registerFail(payload) {
  return {
    type: REGISTER_FAIL,
    payload,
  }
}

export function initializeStatus(payload) {
  return {
    type: INITIALIZE_STATUS,
    payload,
  }
}
