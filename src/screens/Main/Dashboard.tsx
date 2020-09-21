import React, { Component } from "react"

import {
  View,
  FlatList,
  StyleSheet,
} from "react-native"

import { connect } from "react-redux"

import moment from "moment"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import {
  Container,
  Drawer,
  Header,
  Paragraph,
  Space,
} from "@base-components";
import { COLOR } from "@themes";
import { DrawerContent } from "@custom-components";

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: COLOR.DARK_BLUE,
  },
  itemSideContent: {
    flex: 0,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemLoc: {
    flexDirection: "row",
    alignItems: "center",
  },
})

interface DashboardProps {
  navigation: any,
  auth: any,
}

class Dashboard extends Component<DashboardProps> {
  drawer: any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemSideContent}>
        <Icon
          name="account"
          size={30}
          color={COLOR.DARK_BLUE}
        />
      </View>
      <View style={styles.itemInfo}>
        <Paragraph
          text="Ate Seller"
          fontType="bold"
          size={18}
          color={COLOR.DARK_BLUE}
        />
        <View style={styles.itemLoc}>
          <Icon
            name="map-marker"
            size={20}
            color={COLOR.DARK_BLUE}
          />
          <Space horizontal size={5} />
          <Paragraph
            text="Makati"
            fontType="light"
            size={16}
            color={COLOR.DARK_BLUE}
          />
        </View>
      </View>
      <View style={styles.itemSideContent}>
        <Icon
          name="truck"
          size={30}
          color={COLOR.DARK_BLUE}
        />
        <Paragraph
          text="To Deliver"
          fontType="light"
          size={14}
          color={COLOR.DARK_BLUE}
        />
      </View>
    </View>
  )

  render() {
    return (
      <Drawer
        ref={drawerRef => { this.drawer = drawerRef }}
        content={(<DrawerContent />)}
      >
        <Container>
          <Header
            left="menu"
            leftTestId="headerLeftButton"
            leftColor={COLOR.DARK_BLUE}
            leftPress={() => this.drawer.open()}
            center={`Dashboard | ${moment().format("dddd, MMMM DD, YYYY")}`}
            right="refresh"
          />
          <FlatList
            data={[{ id: 1 }]}
            contentContainerStyle={styles.content}
            keyExtractor={(item: any, index) => item.id || index}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Paragraph
                  text="Seller List"
                  fontType="bold"
                  size={20}
                  color={COLOR.DARK_BLUE}
                />
              </View>
            )}
            renderItem={this.renderItem}
          />
        </Container>
      </Drawer>
    )
  }
}

const mapStateToProps = (data: any) => ({
  auth: data.authenticate,
})

export default connect(mapStateToProps)(Dashboard);
