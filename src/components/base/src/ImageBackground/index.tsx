/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native"

import FastImage from "react-native-fast-image"

import baseConfig from "../../base-config";

type authorization = {
  Authorization?: string,
}

type priority = "high" | "normal" | "low"

type cache = "immutable" | "web" | "cacheOnly"

type resizeModes = "contain" | "cover" | "stretch" | "center"

type customImageCache = {
  uri: string,
  header?: authorization,
  priority?: priority,
  token?: string,
  cache?: cache,
}

interface ImageBackgroundProps {
  style: StyleProp<ViewStyle>;
  uri: customImageCache;
  /**
   * Determines how to resize the image when the frame doesn't match the raw image dimensions.
   *
   * This can be one of the following values:
   * - `contain` - Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
   * - `cover` - Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).
   * - `center` - Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.
   * - `stretch` - Scale width and height independently, This may change the aspect ratio of the image.
   * - `repeat` - Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.
   */
  resizeMode?: resizeModes;
  imageBorderRadius?: number;
  childre?: Element,
}

class ImageBackground extends PureComponent<ImageBackgroundProps> {
  public static defaultProps = {
    children: baseConfig.imageBackground.children,
    resizeMode: baseConfig.imageBackground.resizeMode,
    imageBorderRadius: baseConfig.imageBackground.imageBorderRadius,
  };

  resize = () => {
    const { resizeMode } = this.props;
    if (resizeMode === "contain") {
      return FastImage.resizeMode.contain
    }
    if (resizeMode === "cover") {
      return FastImage.resizeMode.cover
    }
    if (resizeMode === "center") {
      return FastImage.resizeMode.center
    }
    if (resizeMode === "stretch") {
      return FastImage.resizeMode.stretch
    }
    return FastImage.resizeMode.contain;
  }

  render() {
    const {
      children,
      style,
      uri,
      imageBorderRadius,
      ...props
    } = this.props;

    return (
      <View
        accessibilityIgnoresInvertColors
        style={style}
      >
        <FastImage
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: imageBorderRadius,
            },
          ]}
          source={uri}
          resizeMode={this.resize()}
          {...props}
        />
        {children}
      </View>
    );
  }
}

export default ImageBackground;
