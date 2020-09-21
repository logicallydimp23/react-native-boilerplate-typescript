import AsyncStorage from "@react-native-community/async-storage";

import {
  put,
  call,
  delay,
  takeLatest,
} from "redux-saga/effects";

import NavigationService from "@navigationService";
import Config from "react-native-config";
import * as types from "./action-types";
import { authUser, getUser } from "./effects";

function* login(action) {
  yield delay(3000)
  const {
    username,
    password,
  } = action.payload;
  const auth = yield call(authUser, {
    username,
    password,
  })
  if (auth.status === 200) {
    const user = yield call(getUser, { token: auth.data.data })
    // Should be changed to API response from /me
    const session = {
      token: auth.data.data,
      data: user.data.data,
    };
    yield call(AsyncStorage.setItem, Config.SESSION_KEY, JSON.stringify(session))
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        session,
      },
    })
    NavigationService.navigate("Main")
  } else {
    yield put({
      type: types.LOGIN_FAILED,
      payload: {
        error: "Invalid username or password",
      },
    })
  }
}

function* logout() {
  yield AsyncStorage.removeItem(Config.SESSION_KEY)
  yield put({ type: types.LOGOUT_SUCCESS })
  NavigationService.navigate("Auth")
}

function* restoreSession() {
  try {
    const session = yield call(AsyncStorage.getItem, Config.SESSION_KEY)
    const data = JSON.parse(session);
    if (session != null) {
      yield put({
        type: types.RESTORE_SUCCESS,
        payload: {
          session: data,
        },
      })
      yield delay(2000)
      NavigationService.navigate("Main")
    } else {
      yield put({ type: types.RESTORE_FAILED })
      NavigationService.navigate("Auth")
    }
  } catch (e) {
    yield put({ type: types.RESTORE_FAILED })
    NavigationService.navigate("Auth")
  }
}

const authSaga = [
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.LOGOUT_PROCESSING, logout),
  takeLatest(types.RESTORE_REQUEST, restoreSession),
];

export default authSaga;
