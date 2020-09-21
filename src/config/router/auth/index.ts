import { createStackNavigator } from "react-navigation-stack"

import { Login } from "@screens"

// eslint-disable-next-line @typescript-eslint/naming-convention
const Auth = createStackNavigator({
  Login,
}, {
  defaultNavigationOptions: {
    headerShown: false,
  },
})

export default Auth;
