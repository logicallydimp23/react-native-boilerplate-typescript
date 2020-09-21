/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

import {
  Splash,
  Dashboard,
} from "@screens"

import Auth from "./auth"

const Authenticated = createStackNavigator({
  DashboardStack: {
    screen: Dashboard,
  },
}, {
  initialRouteName: "DashboardStack",
  defaultNavigationOptions: {
    headerShown: false,
  },
})

const AppSwitchNavigator = createSwitchNavigator({
  Splash,
  Auth,
  Main: Authenticated,
}, {
  // Default options
  initialRouteName: "Splash",
})

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
