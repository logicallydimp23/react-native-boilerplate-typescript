/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import {
  Text,
  TouchableOpacity,
  TextProps,
  StyleSheet,
} from "react-native"

import { FONT } from "@themes";
import baseConfig from "../../base-config";

const styles = StyleSheet.create({
  tappable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})

type fontTypes = "light" | "bold" | "regular" | "lightItalic" | "italic" | "boldItalic"

interface ParagraphProps extends TextProps {
  /**
   * This can be one of the following values:
   *
   * - `light` -  Thinner font
   * - `bold` - Heavier font
   * - `regular` - Common font
   * - `lightItalic` - Thinner Italic font
   * - `italic` - Italic font
   * - `boldItalic` - Heavier Italic font
   *
   * > See `src/config/themes/Fonts.js` for font values.
   *
   * > The default is `regular`.
   */
  fontType?: fontTypes;
  size?: number;
  color?: string;
  /**
   * Required prop!
   */
  text: string | number;
  center?: boolean;
  textStyle?: object;
  tappable?: boolean;
  onTap?: () => void;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
}

class Paragraph extends PureComponent<ParagraphProps> {
  public static defaultProps = {
    fontType: baseConfig.paragraph.fontType,
    size: baseConfig.paragraph.size,
    color: baseConfig.paragraph.color,
    center: baseConfig.paragraph.center,
    textStyle: baseConfig.paragraph.textStyle,
    tappable: baseConfig.paragraph.tappable,
    onTap: baseConfig.paragraph.onTap,
    testID: baseConfig.paragraph.testID,
    textTransform: baseConfig.paragraph.textTransform,
  }

  identifyFontType = () => {
    const {
      fontType,
    } = this.props;

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

  render() {
    const {
      size,
      color,
      text,
      center,
      textStyle,
      tappable,
      onTap,
      testID,
      textTransform,
      ...props
    } = this.props;
    if (tappable) {
      return (
        <TouchableOpacity
          testID={testID}
          onPress={onTap}
          style={styles.tappable}
        >
          <Text
            style={{
              fontSize: size,
              fontFamily: this.identifyFontType(),
              color,
              ...center && { textAlign: "center" },
              ...textStyle,
              ...{ textTransform },
            }}
            {...props}
          >
            {text}
          </Text>
        </TouchableOpacity>
      )
    }
    return (
      <Text
        testID={testID}
        style={{
          fontSize: size,
          fontFamily: this.identifyFontType(),
          color,
          ...center && { textAlign: "center" },
          ...textStyle,
          ...{ textTransform },
        }}
        {...props}
      >
        {text}
      </Text>
    );
  }
}

export default Paragraph;
