import {
  NavigationActions,
  StackActions,
  NavigationNavigateAction,
  NavigationPopAction,
  NavigationPushAction,
} from "react-navigation";

// eslint-disable-next-line @typescript-eslint/naming-convention
let _navigator: { dispatch: (arg0: NavigationNavigateAction | NavigationPopAction | NavigationPushAction) => void; };

function setTopLevelNavigator(navigatorRef: { dispatch: (arg0: NavigationNavigateAction | NavigationPopAction | NavigationPushAction) => void; }) {
  _navigator = navigatorRef;
}

function navigate(routeName: any, params: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(
    StackActions.pop({ n: 1 }),
  );
}

function push(routeName: any, params: any) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  back,
  push,
};
