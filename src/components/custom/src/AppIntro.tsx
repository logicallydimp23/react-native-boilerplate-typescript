import React, { Component } from "react"

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"

import {
  listenOrientationChange as loc,
  removeOrientationListener as rol,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Paragraph, CachedImage } from "@base-components";
import { COLOR } from "@themes";
import IMAGES from "@images";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  introPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginVertical: 20,
  },
});

const intro = [
  {
    image: IMAGES["grunge-design.jpg"],
  },
  {
    image: IMAGES["grunge-summer.jpg"],
  },
]

interface AppIntroProps {
  getStarted: any,
}

interface AppIntroState {
  page: any,
}

class AppIntro extends Component<AppIntroProps, AppIntroState> {
  scrollView: any;

  constructor(props: AppIntroProps) {
    super(props);
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    loc(this)
  }

  componentWillUnmount() {
    rol()
  }

  renderOnboard = () => {
    const { page } = this.state;
    const { getStarted } = this.props;
    return intro.map((data, index) => (
      <View
        style={{
          width: wp(100),
          height: hp(100),
          backgroundColor: COLOR.LIGHT_BLUE,
        }}
      >
        <View style={styles.introContent}>
          <CachedImage
            uri={data.image}
            width={200}
            height={200}
          />
        </View>
        <View style={styles.introPagination}>
          <View>
            {(index <= (intro.length - 1) && index > 0) && (
              <TouchableOpacity
                onPress={() => {
                  this.scrollView.scrollTo({ x: wp(100) * (page - 2), y: 0, animated: true })
                  this.setState({ page: page - 1 })
                }}
              >
                <Paragraph
                  fontType="bold"
                  size={24}
                  text="Back"
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            {(index >= 0 && (index < (intro.length - 1))) ? (
              <TouchableOpacity
                onPress={() => {
                  this.scrollView.scrollTo({ x: wp(100) * page, y: 0, animated: true })
                  this.setState({ page: page + 1 })
                }}
              >
                <Paragraph
                  fontType="bold"
                  size={24}
                  text="Next"
                />
              </TouchableOpacity>
            )
              : (
                <TouchableOpacity
                  onPress={() => getStarted()}
                >
                  <Paragraph
                    fontType="bold"
                    size={24}
                    text="Get Started"
                  />
                </TouchableOpacity>
              )}
          </View>
        </View>
      </View>
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef => { this.scrollView = scrollRef }}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderOnboard()}
        </ScrollView>
      </View>
    )
  }
}

export default AppIntro;
