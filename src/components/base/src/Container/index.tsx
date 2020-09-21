import React, { PureComponent } from "react"

import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native"

import LinearGradient from "react-native-linear-gradient";

import baseConfig from "../../base-config";

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
})

type gradientPositions = {
  x: number,
  y: number,
}

interface ContainerProps extends ViewProps {
  gradient?: boolean,
  /**
   * { x: number, y: number }
   */
  start?: gradientPositions,
  /**
   * { x: number, y: number }
   */
  end?: gradientPositions,
  colors?: string[] | any,
  style?: StyleProp<ViewStyle>,
  children?: Element,
  drawer?: boolean,
  drawerContent?: Element,
  drawerPercentage?: number,
  drawerOverlay?: boolean,
  drawerOpacity?: number,
  backgroundColor?: string,
}

class Container extends PureComponent<ContainerProps> {
  public static defaultProps = {
    gradient: baseConfig.container.gradient,
    start: baseConfig.container.start,
    end: baseConfig.container.end,
    colors: baseConfig.container.colors,
    style: baseConfig.container.style,
    children: baseConfig.container.children,
    backgroundColor: baseConfig.container.backgroundColor,
  }

  render() {
    const {
      gradient,
      start,
      end,
      colors,
      style,
      backgroundColor,
      children,
      ...props
    } = this.props;
    if (gradient) {
      return (
        <LinearGradient
          start={start}
          end={end}
          colors={colors}
          style={{
            ...styles.container,
            ...style as {},
            height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
          }}
          {...props}
        >
          {children}
        </LinearGradient>
      )
    }
    return (
      <View
        style={{
          ...styles.container,
          ...style as {},
          height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
          backgroundColor,
        }}
        {...props}
      >
        {children}
      </View>
    )
  }
}

export default Container;
