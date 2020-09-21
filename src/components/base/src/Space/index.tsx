import React, { PureComponent } from "react"

import {
  View,
} from "react-native"

import baseConfig from "../../base-config";

interface SpaceProps {
  horizontal: true | false,
  size: number,
  /**
   * Background of the space.
   *
   * Used as if like a border.
   */
  color?: string,
}

class Space extends PureComponent<SpaceProps> {
  public static defaultProps = {
    horizontal: baseConfig.space.horizontal,
    size: baseConfig.space.size,
    color: baseConfig.space.color,
  }

  spaceCalculations = (horizontal: boolean, size: number) => {
    if (horizontal) {
      return {
        width: size,
      }
    }
    return {
      height: size,
    }
  }

  render() {
    const {
      horizontal,
      size,
      color,
    } = this.props;
    return (
      <View
        style={[this.spaceCalculations(horizontal, size), { backgroundColor: color }]}
      />
    )
  }
}

export default Space;
