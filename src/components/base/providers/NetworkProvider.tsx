/* eslint-disable react/no-unused-state */
import React, { Component, createContext } from "react"

import NetInfo from "@react-native-community/netinfo";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NetworkContext = createContext({
  type: "none",
  connected: false,
});

interface NetworkProviderState {
  type: string,
  connected: any,
}

class NetworkProvider extends Component<any, NetworkProviderState> {
  subscribe: any;

  constructor(props: any) {
    super(props);
    this.state = {
      type: "none",
      connected: false,
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({
        type: state.type,
        connected: state.isInternetReachable,
      })
    });

    this.subscribe = NetInfo.addEventListener(state => {
      this.setState({
        type: state.type,
        connected: state.isInternetReachable,
      })
    });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  render() {
    const { children } = this.props;
    const {
      type,
      connected,
    } = this.state;
    return (
      <NetworkContext.Provider
        value={{
          type,
          connected,
        }}
      >
        {children}
      </NetworkContext.Provider>
    )
  }
}

export default NetworkProvider;
