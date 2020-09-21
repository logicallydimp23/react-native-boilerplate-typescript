/* eslint-disable import/no-cycle */
import React, { PureComponent } from "react"

import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import Config from "react-native-config"

import { connect } from "react-redux"

import { COLOR, GLOBAL } from "@themes"

import {
  Paragraph,
  CachedImage,
  Space,
  Container,
  Content,
} from "@base-components"

import NavigationService from "@navigationService"
import IMAGES from "@images"
import { LOGOUT_REQUEST } from "../../../redux/authenticate/action-types"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
    padding: 30,
    backgroundColor: COLOR.ASH,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 3,
    backgroundColor: COLOR.DARKER_GRAY,
    padding: 30,
  },
  footer: {
    flex: 1,
    padding: 30,
    backgroundColor: COLOR.DARKER_GRAY,
  },
})

interface DrawerContentProps {
  logout?: any,
}

class DrawerContent extends PureComponent<DrawerContentProps> {
  render() {
    const { logout } = this.props;
    return (
      <Container>
        <Content
          backgroundColor={COLOR.DARKER_GRAY}
        >
          <TouchableOpacity
            testID="drawerProfile"
            style={styles.header}
            onPress={() => NavigationService.navigate("Profile", null)}
          >
            <CachedImage
              uri={IMAGES["steve.png"]}
              rounded
              width={70}
              height={70}
            />
            <Space size={10} />
            <Paragraph
              text="Steve Palero"
              size={18}
              color={COLOR.LIGHT}
            />
            <Space size={5} />
            <Paragraph
              text="Seller"
              color={COLOR.LIGHT}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <Paragraph
              text="Sales History"
              color={COLOR.LIGHT_GRAY}
              tappable
              onTap={() => NavigationService.navigate("SalesHistory", null)}
              testID="drawerSalesHistory"
            />
            <Space size={20} />
            <Paragraph
              text="Members"
              color={COLOR.LIGHT_GRAY}
              tappable
              onTap={() => NavigationService.navigate("Members", null)}
              testID="drawerMembers"
            />
            <Space size={20} />
            <Paragraph
              text="Inventory"
              color={COLOR.LIGHT_GRAY}
              tappable
              onTap={() => NavigationService.navigate("Inventory", null)}
              testID="drawerInventory"
            />
            <Space size={20} />
            <Paragraph
              text="Notifications"
              tappable
              onTap={() => NavigationService.navigate("Notifications", null)}
              color={COLOR.LIGHT_GRAY}
            />
            <Space size={20} />
            <Paragraph
              text="Receive"
              tappable
              onTap={() => NavigationService.navigate("Receive", null)}
              color={COLOR.LIGHT_GRAY}
            />
          </View>
          <Space
            size={1}
            color={COLOR.LIGHT_GRAY}
          />
          <View style={styles.footer}>
            <Paragraph
              text="Scan QR Code"
              color={COLOR.LIGHT_GRAY}
              tappable
              onTap={() => NavigationService.navigate("QRScan", null)}
              testID="drawerQRScan"
            />
            <Space size={20} />
            <Paragraph
              text="Logout"
              color={COLOR.LIGHT_GRAY}
              tappable
              onTap={logout}
            />
            <Space size={60} />
            <Paragraph
              text={`v${Config.APP_VERSION}${Config.DEV === "yes" ? "-BETA" : ""}`}
              size={12}
              color={COLOR.LIGHT_GRAY}
              textStyle={GLOBAL.tappable}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (data: any) => ({
  auth: data.authenticate,
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({
    type: LOGOUT_REQUEST,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
