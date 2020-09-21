/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { Paragraph } from "@base-components"
import baseConfig from "../../base-config"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    height: 56,
  },
  left: {
    flex: 1,
    paddingRight: 15,
  },
  center: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    paddingLeft: 15,
  },
  extendedContainer: {
    padding: 16,
    height: 128,
  },
  extendedTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  extendedBody: {
    paddingVertical: 12,
    paddingHorizontal: 72,
  },
})

type fontTypes = "light" | "bold" | "regular" | "lightItalic" | "italic" | "boldItalic"

interface HeaderProps {
  backgroundColor?: string,
  left?: string | Element,
  leftColor?: string,
  leftPress?: () => void,
  center?: string | Element,
  centerSize?: number,
  centerFontType?: fontTypes,
  centerColor?: string,
  centerTestId: string,
  right?: string | Element,
  rightColor?: string,
  rightPress?: () => void,
  leftTestId?: string,
  rightTestId?: string,
  leftSize?: number,
  rightSize?: number,
  extended?: boolean,
  headerTestId?: string,
}

class Header extends PureComponent<HeaderProps> {
  public static defaultProps = {
    headerTestId: baseConfig.header.headerTestId,
    backgroundColor: baseConfig.header.backgroundColor,
    left: baseConfig.header.left,
    leftColor: baseConfig.header.leftColor,
    leftPress: baseConfig.header.leftPress,
    center: baseConfig.header.center,
    centerSize: baseConfig.header.centerSize,
    centerFontType: baseConfig.header.centerFontType,
    centerColor: baseConfig.header.centerColor,
    right: baseConfig.header.right,
    rightColor: baseConfig.header.rightColor,
    rightPress: baseConfig.header.rightPress,
    extended: baseConfig.header.extended,
    leftTestId: baseConfig.header.leftTestId,
    rightTestId: baseConfig.header.rightTestId,
    centerTestId: baseConfig.header.centerTestId,
    leftSize: baseConfig.header.sideIconSize,
    rightSize: baseConfig.header.sideIconSize,
  }

  renderLeft = () => {
    const {
      left,
      leftColor,
      leftPress,
      leftTestId,
      leftSize,
    } = this.props;
    if (typeof left === "string") {
      return (
        <TouchableOpacity
          testID={leftTestId}
          onPress={leftPress}
        >
          <Icon
            name={left}
            size={leftSize}
            color={leftColor}
          />
        </TouchableOpacity>
      )
    }
    return left
  }

  renderCenter = () => {
    const {
      center,
      centerSize,
      centerFontType,
      centerColor,
      centerTestId,
    } = this.props;

    if (typeof center === "string") {
      return (
        <Paragraph
          testID={centerTestId}
          fontType={centerFontType}
          size={centerSize}
          color={centerColor}
          text={center}
        />
      )
    }
    return center
  }

  renderRight = () => {
    const {
      right,
      rightColor,
      rightPress,
      rightTestId,
      rightSize,
    } = this.props;
    if (typeof right === "string") {
      return (
        <TouchableOpacity
          testID={rightTestId}
          onPress={rightPress}
        >
          <Icon
            name={right}
            size={rightSize}
            color={rightColor}
          />
        </TouchableOpacity>
      )
    }
    return right
  }

  render() {
    const {
      backgroundColor,
      extended,
      headerTestId,
    } = this.props;
    if (extended) {
      return (
        <View
          style={[
            styles.extendedContainer,
            {
              backgroundColor,
            },
          ]}
          testID={headerTestId}
        >
          <View style={styles.extendedTop}>
            <View style={styles.left}>
              {this.renderLeft()}
            </View>
            <View style={styles.right}>
              {this.renderRight()}
            </View>
          </View>
          <View style={styles.extendedBody}>
            {this.renderCenter()}
          </View>
        </View>
      )
    }
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}
      >
        <View style={styles.left}>
          {this.renderLeft()}
        </View>
        <View style={styles.center}>
          {this.renderCenter()}
        </View>
        <View style={styles.right}>
          {this.renderRight()}
        </View>
      </View>
    )
  }
}

export default Header;
