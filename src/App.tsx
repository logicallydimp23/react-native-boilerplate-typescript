import React, { Component } from "react"

import { Provider } from "react-redux"

import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import NavigationService from "@navigationService";
import { LogOut, NetworkStatus } from "@custom-components";
import {
  NetworkProvider,
} from "@base-components";
import AppContainer from "./config/router/routes";
import { LOGOUT_SUCCESS } from "./redux/authenticate/action-types"
import rootReducer from "./redux/root-reducers";
import rootSaga from "./redux/root-sagas";

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const reducer = (state : any, action : any) => {
  if (action.type === LOGOUT_SUCCESS) { // If the user have successfully signed out and ended his/her session ignore the line below line 24
    // eslint-disable-next-line no-param-reassign
    state = undefined // Reset all state to remove cached data of the previous session
  }
  return rootReducer(state, action)
}
const store = createStoreWithMiddleware(reducer)
sagaMiddleware.run(rootSaga);

class App extends Component<any, {}> {
  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <NetworkStatus />
          <AppContainer
            ref={(navigatorRef: any) => NavigationService.setTopLevelNavigator(navigatorRef)}
          />
          <LogOut />
          {/* <LocationListener /> */}
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;
