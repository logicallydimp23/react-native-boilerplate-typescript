/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import { View, StyleSheet, ScrollViewProps } from "react-native"

import { KeyboardAwareScrollView, KeyboardAwareProps } from "react-native-keyboard-aware-scroll-view"

import baseConfig from "../../base-config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

interface ContentProps extends ScrollViewProps, KeyboardAwareProps {
  backgroundColor?: string,
  children?: Element,
}

class Content extends PureComponent<ContentProps> {
  public static defaultProps = {
    backgroundColor: baseConfig.content.backgroundColor,
    children: baseConfig.content.children,
  }

  render() {
    const {
      backgroundColor,
      children,
      ...props
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}
      >
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          enableOnAndroid
          extraHeight={5}
          {...props}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default Content;
