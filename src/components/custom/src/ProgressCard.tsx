/* eslint-disable react/require-default-props */
/* eslint-disable radix */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from "react"

import PropTypes from "prop-types";

import { View, ViewPropTypes } from "react-native";
import { Svg, Path, G } from "react-native-svg";

interface ProgressCardProps {
  style: {},
  size: number,
  fill: number,
  width: number,
  backgroundWidth: number,
  tintColor: string,
  tintTransparency: boolean,
  backgroundColor: string,
  rotation: number,
  lineCap: any,
  arcSweepAngle: number,
  children: (arg: any) => void,
  childrenContainerStyle: {},
  padding: number,
  renderCap: (argument: any) => void,
  dashedBackground: any,
  dashedTint: any,
}

class ProgressCard extends PureComponent<ProgressCardProps> {
  static propTypes: any;

  static values: any;

  static defaultProps: {
    tintColor: "black",
    tintTransparency: true,
    rotation: 90,
    lineCap: "butt",
    arcSweepAngle: 360,
    padding: 0,
    dashedBackground: { width: 0, gap: 0 },
    dashedTint: { width: 0, gap: 0 },
  };

  clampFill = (fill: any) => Math.min(100, Math.max(0, fill));

  circlePath(x: any, y: any, radius: any, startAngle: any, endAngle: any) {
    const start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(" ");
  }

  // eslint-disable-next-line class-methods-use-this
  polarToCartesian(centerX: any, centerY: any, radius: any, angleInDegrees: any) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      tintTransparency,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      // childrenContainerStyle,
      padding,
      dashedBackground,
      dashedTint,
    } = this.props;

    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;

    const currentFillAngle = (arcSweepAngle * this.clampFill(fill)) / 100;
    const backgroundPath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      tintTransparency ? 0 : currentFillAngle,
      arcSweepAngle,
    );
    const circlePath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      currentFillAngle,
    );
    const coordinate = this.polarToCartesian(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      currentFillAngle,
    );
    const cap = this.props.renderCap ? this.props.renderCap({ center: coordinate }) : null;

    // const offset = size - maxWidthCircle * 2;

    // const localChildrenContainerStyle = {
    //   ...{
    //     position: "absolute",
    //     left: maxWidthCircle + padding / 2,
    //     top: maxWidthCircle + padding / 2,
    //     width: offset,
    //     height: offset,
    //     borderRadius: offset / 2,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     overflow: "hidden",
    //   },
    //   ...childrenContainerStyle,
    // }

    const strokeDasharrayTint = dashedTint.gap > 0
      ? Object.keys(dashedTint)
      // tslint:disable-next-line: radix
        .map((value: any) => parseInt(dashedTint[value]))
      : undefined;

    const strokeDasharrayBackground = dashedBackground.gap > 0
      ? Object.keys(dashedBackground)
      // tslint:disable-next-line: radix
        .map((value: any) => parseInt(dashedTint[value]))
      : undefined;

    return (
      <View style={style}>
        <Svg width={size + padding} height={size + padding}>
          <G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                strokeDasharray={strokeDasharrayBackground}
                fill="transparent"
              />
            )}
            {fill > 0 && (
              <Path
                d={circlePath}
                stroke={tintColor}
                strokeWidth={width}
                strokeLinecap={lineCap}
                strokeDasharray={strokeDasharrayTint}
                fill="transparent"
              />
            )}
            {cap}
          </G>
        </Svg>
      </View>
    );
  }
}

ProgressCard.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  tintTransparency: PropTypes.bool,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  // children: PropTypes.func,
  // childrenContainerStyle: ViewPropTypes.style,
  padding: PropTypes.number,
  renderCap: PropTypes.func,
  dashedBackground: PropTypes.object,
  dashedTint: PropTypes.object,
};

export default ProgressCard;
