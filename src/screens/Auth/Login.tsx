import React, { Component } from "react"

import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import LottieView from "lottie-react-native"

import { connect } from "react-redux";

import {
  Container,
  CachedImage,
  Space,
  Paragraph,
  Input,
  Content,
} from "@base-components";
import IMAGES from "@images";
import { COLOR } from "@themes";
import ANIMATION from "@animation";
import { LOGIN_REQUEST } from "../../redux/authenticate/action-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    width: wp(100),
    minHeight: hp(80),
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: wp(100),
    height: hp(90),
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.LIGHTER_GRAY,
    borderRadius: 105,
    overflow: "hidden",
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.LIGHTER_GRAY,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
  },
  button: {
    width: wp(100) - 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 12,
  },
  loading: {
    height: 20,
  },
})

interface ScreenProps {
  dispatch: any,
  auth: any,
}

interface ScreenState {
  username: string,
  password: string,
}

class Login extends Component<ScreenProps, ScreenState> {
  constructor(props: ScreenProps) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleLoginRequest = () => {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username,
        password,
      },
    });
  }

  render() {
    const { auth } = this.props
    const {
      username,
      password,
    } = this.state;
    return (
      <Container
        style={styles.container}
      >
        <Content
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="never"
          backgroundColor={COLOR.LIGHT}
        >
          <View style={styles.content}>
            <Space
              size={20}
            />
            <View style={styles.logoContainer}>
              <CachedImage
                uri={IMAGES["react.jpg"]}
                width={200}
                height={200}
                resize="contain"
                rounded
              />
            </View>
            <Space
              size={80}
            />
            {auth.authError.length > 0 && (
              <>
                <Paragraph
                  fontType="italic"
                  size={16}
                  color={COLOR.RED}
                  text={auth.authError}
                />
                <Space size={10} />
              </>
            )}
            <Input
              testID="username"
              value={username}
              onChangeText={(v: any) => this.setState({ username: v })}
              placeholder="Username"
              fontType="light"
              inputSize={16}
              fontColor={COLOR.ASH}
              placeholderColor={COLOR.GRAY}
              spacing={5}
              verticalSpacing={2}
              leftIcon="account"
              leftIconSize={24}
              leftIconColor={COLOR.GRAY}
              borderRadius={8}
              backdropColor={COLOR.APP_GRAY}
            />
            <Space size={20} />
            <Input
              testID="password"
              value={password}
              onChangeText={(v: any) => this.setState({ password: v })}
              placeholder="Password"
              fontType="light"
              inputSize={16}
              fontColor={COLOR.ASH}
              placeholderColor={COLOR.GRAY}
              spacing={5}
              verticalSpacing={2}
              leftIcon="lock"
              leftIconSize={24}
              leftIconColor={COLOR.GRAY}
              borderRadius={8}
              backdropColor={COLOR.APP_GRAY}
              secureText
            />

            <Space size={40} />

            <TouchableOpacity
              testID="Login"
              onPress={this.handleLoginRequest}
              style={[
                styles.button,
                {
                  backgroundColor: auth.requestingAuth ? COLOR.LIGHT_GRAY : COLOR.ASH,
                },
              ]}
              disabled={auth.requestingAuth}
            >
              {auth.requestingAuth ? (
                <LottieView
                  source={ANIMATION.loading}
                  style={styles.loading}
                  autoPlay
                  loop
                />
              )
                : (
                  <Paragraph
                    fontType="regular"
                    size={16}
                    color={COLOR.WHITE}
                    text="Login"
                  />
                )}
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (data: any) => ({
  auth: data.authenticate,
})

export default connect(mapStateToProps)(Login);
