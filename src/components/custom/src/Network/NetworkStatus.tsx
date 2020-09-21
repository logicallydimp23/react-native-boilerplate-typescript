import React, { PureComponent } from "react"

import {
  View,
  StyleSheet,
} from "react-native"

import { Paragraph } from "@base-components"

import { COLOR } from "@themes";

import { NetworkContext } from "../../../base/providers/NetworkProvider"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(26, 45, 61, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
})

class NetworkStatus extends PureComponent {
  render() {
    const { connected } = this.context;
    if (!connected) {
      return (
        <View style={styles.container}>
          <Paragraph
            fontType="light"
            text="You are currently offline."
            size={16}
            color={COLOR.LIGHT}
          />
        </View>
      )
    }

    return null;
  }
}

NetworkStatus.contextType = NetworkContext

export default NetworkStatus;
