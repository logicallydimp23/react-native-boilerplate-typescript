/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Animated,
  View,
  Dimensions,
  StatusBar,
  ScrollViewProps,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Paragraph } from "@base-components";
import baseConfig from "../../base-config";

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// eslint-disable-next-line no-nested-ternary
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: baseConfig.rnParallax.navbarColor,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: baseConfig.rnParallax.headerMaxHeight,
    resizeMode: "cover",
  },
  bar: {
    backgroundColor: "transparent",
    height: baseConfig.rnParallax.headerMinHeight,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

type resizeModes = "contain" | "cover" | "stretch" | "center"

type priority = "high" | "normal" | "low"

type cache = "immutable" | "web" | "cacheOnly"

/**
 * CachedImage exclusive prop
 */
type authorization = {
  Authorization?: string,
}

/**
 * CachedImage exclusive prop
 */
type customImageCache = {
  uri: string,
  header?: authorization,
  priority?: priority,
  cache?: cache,
}

interface RNParallaxProps extends ScrollViewProps {
  renderContent: () => Element,
  renderNavBar: () => Element,
  backgroundColor?: string,
  backgroundImage?: customImageCache | string | any,
  navbarColor?: string,
  title?: string | Element,
  titleSize?: number,
  titleColor?: string,
  titleFontType?: string | any,
  titleStyle?: object,
  headerTitleStyle?: object,
  headerMaxHeight?: number | any,
  headerMinHeight?: number | any,
  extraScrollHeight?: number | any,
  backgroundImageScale?: number,
  contentContainerStyle?: object,
  innerContainerStyle?: object,
  scrollViewStyle?: object,
  containerStyle?: object,
  alwaysShowTitle?: boolean,
  alwaysShowNavBar?: boolean,
  statusBarColor?: string,
  scrollViewProps?: object,
  resize?: resizeModes,
}

interface RNParallaxState {
  scrollY: number | any,
}

class RNParallax extends Component<RNParallaxProps, RNParallaxState> {
  public static defaultProps = {
    renderNavBar: baseConfig.rnParallax.renderNavBar,
    navbarColor: baseConfig.rnParallax.navbarColor,
    backgroundColor: baseConfig.rnParallax.backgroundColor,
    backgroundImage: baseConfig.rnParallax.backgroundImage,
    title: baseConfig.rnParallax.title,
    titleSize: baseConfig.rnParallax.titleSize,
    titleColor: baseConfig.rnParallax.titleColor,
    titleFontType: baseConfig.rnParallax.titleFontType,
    titleStyle: baseConfig.rnParallax.titleStyle,
    headerTitleStyle: baseConfig.rnParallax.headerTitleStyle,
    headerMaxHeight: baseConfig.rnParallax.headerMaxHeight,
    headerMinHeight: baseConfig.rnParallax.headerMinHeight,
    scrollEventThrottle: baseConfig.rnParallax.scrollEventThrottle,
    extraScrollHeight: baseConfig.rnParallax.extraScrollHeight,
    backgroundImageScale: baseConfig.rnParallax.backgroundImageScale,
    contentContainerStyle: baseConfig.rnParallax.contentContainerStyle,
    innerContainerStyle: baseConfig.rnParallax.innerContainerStyle,
    scrollViewStyle: baseConfig.rnParallax.scrollViewStyle,
    containerStyle: baseConfig.rnParallax.containerStyle,
    alwaysShowTitle: baseConfig.rnParallax.alwaysShowTitle,
    alwaysShowNavBar: baseConfig.rnParallax.alwaysShowNavBar,
    statusBarColor: baseConfig.rnParallax.statusBarColor,
    scrollViewProps: baseConfig.rnParallax.scrollViewProps,
    resize: baseConfig.rnParallax.resize,
  };

  constructor(props: RNParallaxProps) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getHeaderMaxHeight() + this.getExtraScrollHeight(), this.getHeaderMaxHeight(), this.getHeaderMinHeight()],
      extrapolate: "clamp",
    });
  }

  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: "clamp",
    });
  }

  getImageOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
  }

  getImageTranslate() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: "clamp",
    });
  }

  getImageScale() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: "clamp",
    });
  }

  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: "clamp",
    });
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowTitle } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: "clamp",
    });
  }

  identifyMode = () => {
    const { resize } = this.props;
    if (resize === "cover") {
      return FastImage.resizeMode.cover;
    }
    if (resize === "stretch") {
      return FastImage.resizeMode.stretch;
    }
    if (resize === "center") {
      return FastImage.resizeMode.center;
    }
    return FastImage.resizeMode.contain;
  }

  checkPriority = (priorityType: string) => {
    if (priorityType === "normal") {
      return FastImage.priority.normal;
    }
    if (priorityType === "high") {
      return FastImage.priority.high;
    }
    return FastImage.priority.low;
  }

  checkCache = (cacheType: string) => {
    if (cacheType === "immutable") {
      return FastImage.cacheControl.immutable;
    }

    if (cacheType === "cacheOnly") {
      return FastImage.cacheControl.cacheOnly;
    }

    return FastImage.cacheControl.web;
  }

  defineUri = () => {
    const { backgroundImage } = this.props;
    if (typeof backgroundImage === "string") {
      return {
        uri: backgroundImage,
        headers: { Authorization: baseConfig.cachedImage.token },
        priority: this.checkPriority(baseConfig.cachedImage.priority),
        cache: this.checkCache(baseConfig.cachedImage.cache),
      }
    }

    if (typeof backgroundImage === "object") {
      return {
        uri: backgroundImage.uri,
        headers: { Authorization: backgroundImage.token },
        priority: this.checkPriority(typeof backgroundImage.priority !== "undefined" ? backgroundImage.priority : baseConfig.cachedImage.priority),
        cache: this.checkCache(typeof backgroundImage.cache !== "undefined" ? backgroundImage.cache : baseConfig.cachedImage.cache),
      }
    }

    return backgroundImage
  }

  renderBackgroundImage() {
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
    return (
      <AnimatedFastImage
        source={this.defineUri()}
        style={{
          opacity: imageOpacity,
          width: "100%",
          height: this.getHeaderMaxHeight(),
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
        resizeMode={this.identifyMode()}
      />
    );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor,
          },
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  renderHeaderTitle() {
    const {
      title,
      titleSize,
      titleColor,
      titleFontType,
      titleStyle,
      headerTitleStyle,
    } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [
              { translateY: titleTranslateY },
            ],
            height: this.getHeaderHeight(),
            opacity: titleOpacity,
          },
          headerTitleStyle,
        ]}
      >
        {typeof title === "string"
          && (
            <Paragraph
              text={title}
              size={titleSize}
              fontType={titleFontType}
              color={titleColor}
              textStyle={titleStyle}
            />
          )}
        {typeof title !== "string" && title}
      </Animated.View>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
          },
        ]}
      >
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderScrollView() {
    const {
      renderContent,
      scrollEventThrottle,
      scrollViewStyle,
      contentContainerStyle,
      innerContainerStyle,
      scrollViewProps,
    } = this.props;
    const { scrollY } = this.state;
    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        )}
        {...scrollViewProps}
      >
        <View style={[{ marginTop: this.getHeaderMaxHeight() }, innerContainerStyle]}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  render() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <StatusBar
          backgroundColor={statusBarColor || navbarColor}
        />
        {this.renderScrollView()}
        {this.renderNavbarBackground()}
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderForeground()}
      </View>
    );
  }
}

export default RNParallax;
