import React, { Component } from "react"

import {
  Image,
  StyleSheet,
} from "react-native"

import FastImage from "react-native-fast-image";

import OneSignal from "react-native-onesignal"

import { connect } from "react-redux";

import {
  Container,
  CachedImage,
} from "@base-components";
import IMAGES from "@images";
import { RESTORE_REQUEST } from "../redux/authenticate/action-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
})

interface SplashProps {
  dispatch: any,
}

class Splash extends Component<SplashProps> {
  constructor(properties: SplashProps) {
    super(properties);
    OneSignal.init("1505ee6e-b50e-41d9-a3f4-e8874cedb5fa");

    // OneSignal.addEventListener("received", this.onReceived);
    // OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  // onReceived = (notification: any) => {
  //   console.log("Notification received: ", notification);
  // }

  // onOpened = (openResult: any) => {
  //   console.log('results', openResult)
  // }

  onIds = () => {
    // console.log('Has ID');
  }

  componentDidMount = async () => {
    await this.preloadImages();
    this.checkUser();
  }

  preloadImages = () => {
    const uris = (Object as any).values(IMAGES).map((image: any) => ({
      uri: Image.resolveAssetSource(image).uri,
    }));
    FastImage.preload(uris);
  }

  checkUser = async () => {
    const {
      dispatch,
    } = this.props;
    // Do Process like checking if user is logged in
    await dispatch({ type: RESTORE_REQUEST })
  }

  render() {
    return (
      <Container
        style={styles.container}
      >
        <CachedImage
          uri={IMAGES["react.jpg"]}
          width={200}
          height={200}
        />
        {/* <AppIntro
          getStarted={this.checkUser}
        /> */}
      </Container>
    )
  }
}

const mapStateToProps = (data: any) => ({ auth: data.authenticate })

export default connect(mapStateToProps)(Splash);
