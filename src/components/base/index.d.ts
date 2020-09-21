import React, { PureComponent, Component } from 'react'

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TextInputProps,
  TextInputIOSProps,
  ScrollViewProps,
  ViewProps,
  TextProps,
} from 'react-native'

import { KeyboardAwareProps } from 'react-native-keyboard-aware-scroll-view'
import { FastImageSource } from 'react-native-fast-image'
import { DrawerProperties } from 'react-native-drawer'

type ImageStyleProp = StyleProp<ImageStyle>

type gradientPositions = {
  x: number,
  y: number,
}

type fontTypes = 'light' | 'bold' | 'regular' | 'lightItalic' | 'italic' | 'boldItalic'

type resizeModes = 'contain' | 'cover' | 'stretch' | 'center'

type priority = 'high' | 'normal' | 'low'

type cache = 'immutable' | 'web' | 'cacheOnly'

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

export interface ContainerProps extends ViewProps {
  gradient?: boolean,
  /**
   * { x: number, y: number }
   */
  start?: gradientPositions,
  /**
   * { x: number, y: number }
   */
  end?: gradientPositions,
  colors?: any[],
  style?: StyleProp<ViewStyle>,
  children?: Element,
  drawer?: boolean,
  drawerContent?: Element,
  drawerPercentage?: number,
  drawerOverlay?: boolean,
  drawerOpacity?: number,
}
/**
 * Container
 */
export class Container extends PureComponent<ContainerProps> { }

export interface CachedImageProps {
  /**
   * Source image
   *
   * Can be a local image or remote image
   */
  uri: customImageCache | FastImageSource,
  /**
   * width of the image
   *
   * defaults to 20
   */
  width?: number,
  /**
   * height of the image
   *
   * defaults to 20
   */
  height?: number,
  /**
   * Specifies if image should have rounded border or not
   */
  rounded?: boolean,
  bordered?: boolean,
  borderWidth?: number,
  borderColor?: string,
  /**
   * style of the image.
   */
  imageStyle?: ImageStyleProp,
  /**
   * resizeMode of the image.
   */
  resize?: resizeModes,
  /**
   * tintColor of the image,
   */
  tintColor?: string,
}

/**
 * CachedImage
 *
 * Custom image component.
 *
 * Made with react-native-fast-image.
 */
export class CachedImage extends PureComponent<CachedImageProps> { }

export interface ParagraphProps extends TextProps {
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
  text: string | number | null;
  center?: boolean;
  textStyle?: object;
  tappable?: boolean;
  onTap?: () => void;
}

/**
 * Paragraph
 *
 * Simplified Text component.
 *
 * See https://react-native-halcyon.github.io/documentation/docs/components/paragraph
 */
export class Paragraph extends PureComponent<ParagraphProps> { }

export interface SpaceProps {
  horizontal?: true | false,
  size?: number,
  /**
   * Background of the space.
   *
   * Used as if like a border.
   */
  color?: string,
}

/**
 * Space
 *
 * UI spacer. Horizontal / Vertical
 *
 * Also works as a border if you pass the `color` prop.
 *
 */
export class Space extends PureComponent<SpaceProps> { }

export interface ImageBackgroundProps {
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

/**
 * Imagebackground
 *
 * This component uses FastImage as the image render engine.
 * If you followed the image caching using FastImage then this would work well with you. Adds image background on your component.
 *
 * See https://react-native-halcyon.github.io/documentation/docs/components/image-background
 */
export class ImageBackground extends PureComponent<ImageBackgroundProps> { }

export interface InputProps extends TextInputProps, TextInputIOSProps {
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
}

/**
 * Input
 *
 * Made from TextInput. TextInput props are supported.
 *
 * See https://react-native-halcyon.github.io/documentation/docs/components/input
 */
export class Input extends PureComponent<InputProps> { }

export interface ContentProps extends ScrollViewProps, KeyboardAwareProps {
  backgroundColor?: string,
  children?: Element,
}

export class Content extends PureComponent<ContentProps> { }

export interface HeaderProps {
  backgroundColor?: string,
  left?: string | Element,
  leftColor?: string,
  leftPress?: () => void,
  center?: string | Element,
  centerSize?: number,
  centerFontType?: fontTypes,
  centerColor?: string,
  right?: string | Element,
  rightColor?: string,
  rightPress?: () => void,
  leftTestId?: string,
  rightTestId?: string,
  leftSize?: number,
  rightSize?: number,
}

export class Header extends PureComponent<HeaderProps> { }

type drawerType = "overlay" | "static" | "displace"
type drawerGestures = true | false | "open" | "closed"
type drawerPositions = "left" | "right" | "top" | "bottom"

/**
 * Drawer
 *
 * Component that has been modified for easier usage.
 */
export class Drawer extends PureComponent<DrawerProperties> { }

export interface RNParallaxProps extends ScrollViewProps {
  renderContent: () => void,
  renderNavBar?: () => void,
  backgroundColor?: string,
  backgroundImage?: customImageCache | string,
  navbarColor?: string,
  title?: string | Element,
  titleSize?: number,
  titleColor?: string,
  titleFontType?: string,
  titleStyle?: object,
  headerTitleStyle?: object,
  headerMaxHeight?: number,
  headerMinHeight?: number,
  extraScrollHeight?: number,
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

/**
 * RNParallax
 *
 * Component that provides Parallax effect using ScrollView component
 *
 * To test just pass testID to scrollViewProps
 */
export class RNParallax extends PureComponent<RNParallaxProps> { }

export class NetworkProvider extends Component<any> { }