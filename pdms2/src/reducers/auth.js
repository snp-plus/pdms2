import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  LOGOUT,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  INITIALIZE_STATUS,
} from '../constants/auth';

import { getItem, removeItem } from '../utils/localStorage';

const auth = getItem('auth');

const initialState = {
  loggedInUser: auth ? JSON.parse(auth).user : null,
  status: null,
  error: {
    login: null,
    register: null,
  },
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: {
          login: null,
        }
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: payload,
        status: type,
        error: {
          login: null,
        }
      }

    case LOGIN_FAIL:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: {
          login: payload,
        }
      }

    case LOGOUT:
      removeItem('auth');
      
      return {
        ...state,
        loggedInUser: null,
        status: null,
        error: {
          login: null,
          register: null,
        }
      }

    case REGISTER_REQUEST:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: {
          register: null,
        }
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: {
          register: null,
        }
      }

    case REGISTER_FAIL:
      console.log("register reducer fail", payload)
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: {
          register: payload,
        }
      }

      case INITIALIZE_STATUS:
      return {
        ...state,
        status: null,
        error: {
          login: null,
          register: null,
        }
      }

    default:
      return state;
  }
}
