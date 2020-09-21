import { all } from "redux-saga/effects";

import AuthSaga from "./authenticate/sagas";

export default function* rootSaga() {
  yield all([
    ...AuthSaga,
  ]);
}
