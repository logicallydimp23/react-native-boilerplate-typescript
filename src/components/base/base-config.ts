/* eslint-disable @typescript-eslint/naming-convention */
import {
  View,
  Platform,
  Dimensions,
} from "react-native";

import { COLOR } from "@themes";

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// eslint-disable-next-line no-nested-ternary
const NAV_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;

const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;

const defaultFontType = "regular";

const baseConfig = {
  cachedImage: {
    width: 24,
    height: 24,
    rounded: false,
    bordered: false,
    borderWidth: 2,
    borderColor: COLOR.BLUE_GREEN,
    imageStyle: {},
    resize: "contain",
    priority: "normal",
    token: "halcyon-token",
    cache: "immutable",
  },

  container: {
    gradient: false,
    start: {},
    end: {},
    colors: [],
    style: {},
    children: null,
    backgroundColor: COLOR.WHITE,
  },

  content: {
    // tslint:disable-next-line: no-object-literal-type-assertion
    children: {} as View,
    backgroundColor: COLOR.WHITE,
  },

  drawer: {
    type: "overlay",
    tapToClose: true,
    openOffset: 0.2,
    closeMask: 0.2,
    closeOffset: 0,
    style: {
      drawer: {
        shadowColor: COLOR.BLACK,
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 5,
      },
      mainOverlay: {
        opacity: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        elevation: 0,
      },
    },
    // tslint:disable-next-line: no-object-literal-type-assertion
    content: {} as View,
  },

  header: {
    headerTestId: "",
    backgroundColor: COLOR.WHITE,
    left: "menu",
    leftColor: COLOR.DARK_BLUE,
    leftPress: () => null,
    leftTestId: "",
    center: "Home",
    centerSize: 16,
    centerFontType: "light",
    centerColor: COLOR.DARK_BLUE,
    centerTestId: "",
    right: "",
    rightColor: COLOR.DARK_BLUE,
    rightPress: () => null,
    rightTestId: "",
    extended: false,
    sideIconSize: 30,
  },

  imageBackground: {
    // tslint:disable-next-line: no-object-literal-type-assertion
    children: {} as View,
    resizeMode: "cover",
    imageBorderRadius: 0,
  },

  input: {
    backdropColor: COLOR.TRANSPARENT,
    shadow: false,
    elevation: 0,
    spacing: 0,
    verticalSpacing: 2,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: COLOR.LIGHT_GRAY,
    leftButton: false,
    leftButtonPress: () => null,
    leftIcon: "",
    leftIconSize: 20,
    leftIconColor: COLOR.BLACK,
    leftBorderColor: "",
    leftBorderThickness: 0.7,
    rightButton: false,
    rightButtonPress: () => null,
    rightIcon: "",
    rightIconSize: 20,
    rightIconColor: COLOR.BLACK,
    rightBorderColor: "",
    rightBorderThickness: 0.7,
    placeholder: "",
    placeholderColor: COLOR.GRAY,
    secureText: false,
    center: false,
    inputSize: 16,
    // used defaultFontType from above
    fontType: defaultFontType,
    fontColor: COLOR.BLACK,
    containerStyle: {},
    inputStyle: {},
    leftTestId: "",
    rightTestId: "",
  },

  paragraph: {
    // used defaultFontType from above
    fontType: defaultFontType,
    size: 16,
    color: COLOR.ASH,
    center: false,
    textStyle: {},
    tappable: false,
    onTap: () => null,
    textTransform: "none",
    testID: "",
  },

  space: {
    horizontal: false,
    size: 5,
    color: COLOR.TRANSPARENT,
  },

  rnParallax: {
    // tslint:disable-next-line: no-object-literal-type-assertion
    renderNavBar: () => ({} as View),
    navbarColor: COLOR.ASH,
    backgroundColor: COLOR.ASH,
    backgroundImage: null,
    title: null,
    titleSize: 20,
    titleColor: COLOR.LIGHT,
    titleFontType: "regular",
    titleStyle: {},
    headerTitleStyle: null,
    headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
    headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
    scrollEventThrottle: 16,
    extraScrollHeight: 30,
    backgroundImageScale: 1.5,
    contentContainerStyle: null,
    innerContainerStyle: null,
    scrollViewStyle: null,
    containerStyle: null,
    alwaysShowTitle: true,
    alwaysShowNavBar: true,
    statusBarColor: null,
    scrollViewProps: {},
    resize: "cover",
  },
}

export default baseConfig;
