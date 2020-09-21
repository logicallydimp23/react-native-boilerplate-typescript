/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from "react"

import RNDrawer, { DrawerProperties } from "react-native-drawer"
import baseConfig from "../../base-config";

class Drawer extends PureComponent<DrawerProperties> {
  public static defaultProps = {
    type: baseConfig.drawer.type,
    tapToClose: baseConfig.drawer.tapToClose,
    openDrawerOffset: baseConfig.drawer.openOffset,
    panCloseMask: baseConfig.drawer.closeMask,
    closedDrawerOffset: baseConfig.drawer.closeOffset,
    styles: baseConfig.drawer.style,
    tweenHandler: (ratio: any) => ({
      mainOverlay: { opacity: ratio / 2 },
    }),
    content: baseConfig.drawer.content,
  };

  _root: any;

  open = () => {
    this._root.open()
  }

  close = () => {
    this._root.close()
  }

  render() {
    const {
      ...props
    } = this.props;
    return (
      <RNDrawer
        ref={c => (this._root = c)}
        {...props}
      />
    )
  }
}

export default Drawer;
