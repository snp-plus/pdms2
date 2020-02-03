import { call, put, takeLatest } from 'redux-saga/effects';

import { 
  LOGIN_REQUEST,
  REGISTER_REQUEST,
} from '../constants/auth';

import { 
  loginRequest,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
} from '../actions/auth';

import axios from 'axios';
import { getHeaders, getErrorMessage } from '../utils/authHelpers';
import { setItem } from '../utils/localStorage';

axios.defaults.baseURL = '/';

export function* loginRequestHandler({ payload }) {
  const params = {
    url: 'api/login/',
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }
  try {
    const res = yield call(axios.request, params);
    yield call(setItem, 'auth', JSON.stringify(res.data));
    yield put(loginSuccess(res.data.user));
  } catch (err) {
    yield put(loginFail('Invalid Email or Password'));
  }
}

export function* registerRequestHandler({ payload }) {
  const params = {
    url: 'api/register/',
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params);
    yield put(registerSuccess(res));
    yield put(loginRequest(payload));
  } catch (err) {
    yield put(registerFail(getErrorMessage(err.response)));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequestHandler)
  yield takeLatest(REGISTER_REQUEST, registerRequestHandler)
}
