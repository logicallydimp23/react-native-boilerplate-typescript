/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import {
  View,
  Platform,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native"

import LottieView from "lottie-react-native"

import { connect } from "react-redux"

import { COLOR } from "@themes"
import { Paragraph, Space } from "@base-components"
import ANIMATION from "@animation"
import {
  LOGOUT_PROCESSING,
  LOGOUT_CANCEL,
} from "../../../redux/authenticate/action-types"

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 100,
    padding: 40,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  logout: {
    backgroundColor: COLOR.GOOGLE,
  },
  cancel: {
    borderWidth: 1,
    borderColor: COLOR.LIGHT,
  },
  animation: {
    height: 180,
    width: 180,
  },
})

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface LogOutProps {
  auth: any,
  logout: any,
  cancel: any,
}

class LogOut extends PureComponent<LogOutProps> {
  componentDidUpdate(prevProps: any) {
    const { auth } = this.props;
    if (prevProps.auth.isRequestingLogOut !== auth.isRequestingLogOut) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }

  render() {
    const {
      auth,
      logout,
      cancel,
    } = this.props;
    return (
      <View
        style={{
          width: "100%",
          height: auth.isRequestingLogOut ? "100%" : 0,
          backgroundColor: COLOR.TRANSPARENT_BLACK,
          position: "absolute",
          bottom: 0,
        }}
      >
        {auth.isRequestingLogOut && (
          <View style={styles.container}>
            {!auth.isLoggingOut ? (
              <>
                <View style={styles.body}>
                  <Paragraph
                    text="Are you sure you want to log out?"
                    size={16}
                    color={COLOR.LIGHT}
                    center
                  />
                  <Paragraph
                    text="There are still transactions that needs to be synced."
                    size={16}
                    color={COLOR.LIGHT}
                    center
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.logout]}
                  onPress={logout}
                  testID="logout"
                >
                  <Paragraph
                    text="LOG OUT"
                    size={18}
                    color={COLOR.LIGHT}
                  />
                </TouchableOpacity>
                <Space size={15} />
                <TouchableOpacity
                  style={[styles.button, styles.cancel]}
                  onPress={cancel}
                  testID="cancelLogout"
                >
                  <Paragraph
                    text="CANCEL"
                    size={18}
                    color={COLOR.LIGHT}
                  />
                </TouchableOpacity>
                <Space size={30} />
              </>
            )
              : (
                <View style={styles.body}>
                  <LottieView
                    source={ANIMATION.loggingOut}
                    style={styles.animation}
                    autoPlay
                    loop
                  />
                  <Space size={10} />
                  <Paragraph
                    text="Logging you out..."
                    color={COLOR.LIGHT}
                    size={18}
                  />
                </View>
              )}
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = (data: any) => ({
  auth: data.authenticate,
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({
    type: LOGOUT_PROCESSING,
  }),
  cancel: () => dispatch({
    type: LOGOUT_CANCEL,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
