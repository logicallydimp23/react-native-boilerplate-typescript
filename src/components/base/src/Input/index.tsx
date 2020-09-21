import React, { PureComponent } from "react"

import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  TextInputIOSProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { COLOR, GLOBAL, FONT } from "@themes"
import baseConfig from "../../base-config"

type fontTypes = "light" | "bold" | "regular" | "lightItalic" | "italic" | "boldItalic"

interface InputProps extends TextInputProps, TextInputIOSProps {
  backdropColor?: string;
  /**
   * if `true` `elevation` prop will be required for the `shadow` to work.
   */
  shadow?: boolean;
  /**
   * `nullified` if `shadow` is `false`. (so it is dependent on the `shadow` prop).
   *
   * `value` must be 1 or greater for `shadow` to work.
   */
  elevation?: number;
  spacing?: number;
  verticalSpacing?: number;
  borderRadius?: number;
  /**
   * if it has a `value` you need to pass `borderColor` prop otherwise it will return a `transparent` color.
   */
  borderWidth?: number;
  borderColor?: string;
  /**
   * if `true` `leftIcon` can be tapped.
   */
  leftButton?: boolean;
  /**
   * callback if `leftButton` is true nad tapped.
   */
  leftButtonPress?: () => void;
  leftIcon?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  leftBorderColor?: string;
  leftBorderThickness?: number;
  rightButton?: boolean;
  rightButtonPress?: () => void;
  rightIcon?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  rightBorderColor?: string;
  rightBorderThickness?: number;
  placeholderColor?: string;
  secureText?: boolean;
  /**
   * if `true` the `placeholder` and `value` text will be on the center.
   */
  center?: boolean;
  /**
   * size of the font for `placeholder` and `value`.
   */
  inputSize?: number;
  /**
   * This can be one of the following values:
   *
   * - `light` -  Thinner font
   * - `bold` - Heavier font
   * - `regular` - Common font
   *
   * > See `config/constants/themes/Fonts.js` for font values.
   * > The default is `regular`.
   */
  fontType?: fontTypes;
  fontColor?: string;
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  leftTestId?: string
  rightTestId?: string
}

class Input extends PureComponent<InputProps> {
  public static defaultProps = {
    backdropColor: baseConfig.input.backdropColor,
    shadow: baseConfig.input.shadow,
    elevation: baseConfig.input.elevation,
    spacing: baseConfig.input.spacing,
    verticalSpacing: baseConfig.input.verticalSpacing,
    borderRadius: baseConfig.input.borderRadius,
    borderWidth: baseConfig.input.borderWidth,
    borderColor: baseConfig.input.borderColor,
    leftButton: baseConfig.input.leftButton,
    leftButtonPress: baseConfig.input.leftButtonPress,
    leftIcon: baseConfig.input.leftIcon,
    leftIconSize: baseConfig.input.leftIconSize,
    leftIconColor: baseConfig.input.leftIconColor,
    leftBorderColor: baseConfig.input.leftBorderColor,
    leftBorderThickness: baseConfig.input.leftBorderThickness,
    rightButton: baseConfig.input.rightButton,
    rightButtonPress: baseConfig.input.rightButtonPress,
    rightIcon: baseConfig.input.rightIcon,
    rightIconSize: baseConfig.input.rightIconSize,
    rightIconColor: baseConfig.input.rightIconColor,
    rightBorderColor: baseConfig.input.rightBorderColor,
    rightBorderThickness: baseConfig.input.rightBorderThickness,
    placeholder: baseConfig.input.placeholder,
    placeholderColor: baseConfig.input.placeholderColor,
    secureText: baseConfig.input.secureText,
    center: baseConfig.input.center,
    inputSize: baseConfig.input.inputSize,
    fontType: baseConfig.input.fontType,
    fontColor: baseConfig.input.fontColor,
    containerStyle: baseConfig.input.containerStyle,
    inputStyle: baseConfig.input.inputStyle,
    leftTestId: baseConfig.input.leftTestId,
    rightTestId: baseConfig.input.rightTestId,
  }

  renderLeftIcon = (button: boolean, onPress: () => null, name: string, size: number, color: string, spacing: number, borderColor: string, thickness: number, testID: string) => {
    if (name !== "") {
      if (button) {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[GLOBAL.row, GLOBAL.alignItemsCenter]}
            testID={testID}
          >
            <Icon name={name} size={size} color={color} />

            {borderColor !== "" && <View style={{ width: spacing }} />}

            {borderColor !== "" && (
              <View
                style={{
                  borderColor,
                  borderRightWidth: thickness,
                  height: size,
                }}
              />
            )}
          </TouchableOpacity>
        )
      }
      return (
        <View
          style={[GLOBAL.row, GLOBAL.alignItemsCenter]}
          testID={testID}
        >
          <Icon name={name} size={size} color={color} />

          {borderColor !== "" && <View style={{ width: spacing }} />}

          {borderColor !== "" && (
            <View
              style={{
                borderColor,
                borderRightWidth: thickness,
                height: size,
              }}
            />
          )}
        </View>
      )
    }

    return (
      <View />
    )
  }

  renderRightIcon = (button: boolean, onPress: () => null, name: string, size: number, color: string, spacing: number, borderColor: string, thickness: number, testID: string) => {
    if (name !== "") {
      if (button) {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[GLOBAL.row, GLOBAL.alignItemsCenter]}
            testID={testID}
          >
            {borderColor !== "" && (
              <View
                style={{
                  borderColor,
                  borderLeftWidth: thickness,
                  height: size,
                }}
              />
            )}

            {borderColor !== "" && <View style={{ width: spacing }} />}

            <Icon name={name} size={size} color={color} />

          </TouchableOpacity>
        )
      }
      return (
        <View
          style={[GLOBAL.row, GLOBAL.alignItemsCenter]}
          testID={testID}
        >
          {borderColor !== "" && (
            <View
              style={{
                borderColor,
                borderRightWidth: thickness,
                height: size,
              }}
            />
          )}

          {borderColor !== "" && <View style={{ width: spacing }} />}

          <Icon name={name} size={size} color={color} />
        </View>
      )
    }

    return (
      <View />
    )
  }

  identifyFontType = (fontType: string) => {
    switch (fontType) {
      case "light":
        return FONT.light;
      case "bold":
        return FONT.bold;
      case "lightItalic":
        return FONT.lightItalic;
      case "italic":
        return FONT.italic;
      case "boldItalic":
        return FONT.boldItalic;
      default:
        return FONT.regular;
    }
  }

  shadowPlacement = (shadow: boolean, elevation: number) => {
    if (shadow) {
      return {
        shadowColor: COLOR.GRAY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation,
      }
    }
    return {
      shadowColor: COLOR.GRAY,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    }
  }

  render() {
    const {
      backdropColor,
      shadow,
      elevation,
      spacing,
      borderRadius,
      borderWidth,
      borderColor,
      leftButton,
      leftButtonPress,
      leftIcon,
      leftIconSize,
      leftIconColor,
      leftBorderColor,
      leftBorderThickness,
      leftTestId,
      rightButton,
      rightButtonPress,
      rightIcon,
      rightIconSize,
      rightIconColor,
      rightBorderColor,
      rightBorderThickness,
      rightTestId,
      value,
      onChangeText,
      placeholder,
      placeholderColor,
      secureText,
      center,
      inputSize,
      fontType,
      fontColor,
      verticalSpacing,
      containerStyle,
      inputStyle,
      ...props
    } = this.props;

    return (
      <View
        style={{
          backgroundColor: backdropColor,
          paddingLeft: spacing,
          paddingRight: spacing,
          ...GLOBAL.spaceBetween,
          ...GLOBAL.row,
          ...GLOBAL.alignItemsCenter,
          borderRadius,
          ...this.shadowPlacement(shadow as boolean, elevation as number),
          borderWidth,
          borderColor,
          ...containerStyle as {},
        }}
      >
        <View style={GLOBAL.flex0}>
          {this.renderLeftIcon(leftButton as boolean, leftButtonPress as () => null, leftIcon as string, leftIconSize as number, leftIconColor as string, spacing as number, leftBorderColor as string, leftBorderThickness as number, leftTestId as string)}
        </View>
        <View style={GLOBAL.flex1}>
          <TextInput
            style={{
              textAlign: center ? "center" : "left",
              fontFamily: this.identifyFontType(fontType as string),
              fontSize: inputSize,
              color: fontColor,
              paddingLeft: spacing,
              paddingRight: spacing,
              paddingTop: verticalSpacing,
              paddingBottom: verticalSpacing,
              margin: 0,
              ...inputStyle as {},
            }}
            placeholderTextColor={placeholderColor}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureText}
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            autoCapitalize="none"
            {...props}
          />
        </View>
        <View style={GLOBAL.flex0}>
          {this.renderRightIcon(rightButton as boolean, rightButtonPress as () => null, rightIcon as string, rightIconSize as number, rightIconColor as string, spacing as number, rightBorderColor as string, rightBorderThickness as number, rightTestId as string)}
        </View>
      </View>
    );
  }
}

export default Input;
