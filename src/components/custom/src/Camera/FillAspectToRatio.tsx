import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

const styles = StyleSheet.create({
  containerStyle: {
    width: wp(100) * 0.8,
    height: wp(100) * 0.8,
    overflow: "hidden",
    position: "relative",
  },
});

interface FillToAspectRatioProps {
  ratio: string,
}

interface FillToAspectRatioState {
  layoutInfo: any
}

class FillToAspectRatio extends Component<FillToAspectRatioProps, FillToAspectRatioState> {
  public static defaultProps = {
    ratio: "4:3",
  }

  constructor(props: FillToAspectRatioProps) {
    super(props);
    this.state = {
      layoutInfo: null,
    }
  }

  handleLayout = ({ nativeEvent: { layout } } : any) => {
    const { width, height } = layout;
    this.setState({
      layoutInfo: { width, height },
    });
  };

  getRatio = () => {
    const { ratio } = this.props;
    const [ratioWidth, ratioHeight] = ratio.split(":").map(x => Number(x));
    return ratioHeight / ratioWidth;
  };

  render() {
    const { layoutInfo } = this.state;
    const { children } = this.props;
    if (!layoutInfo) {
      return <View key="pre-info" onLayout={this.handleLayout} style={styles.containerStyle} />;
    }
    const { height, width } = layoutInfo;
    let wrapperWidth;
    let wrapperHeight;
    const ratio = this.getRatio();
    if (ratio * height < width) {
      wrapperHeight = width / ratio;
      wrapperWidth = width;
    } else {
      wrapperWidth = ratio * height;
      wrapperHeight = height;
    }
    const wrapperPaddingX = (width - wrapperWidth) / 2;
    const wrapperPaddingY = (height - wrapperHeight) / 2;

    return (
      <View onLayout={this.handleLayout} style={styles.containerStyle}>
        <View
          style={{
            width: wp(100) * 0.8,
            height: wp(100) * 0.8,
            marginLeft: wrapperPaddingX,
            marginTop: wrapperPaddingY,
          }}
        >
          {children}
        </View>
      </View>
    );
  }
}

export default FillToAspectRatio;
