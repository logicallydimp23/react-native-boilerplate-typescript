import { StyleSheet } from "react-native";

const GLOBAL = StyleSheet.create({
  tappable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  /* row */
  row: {
    flexDirection: "row",
  },

  /* justifyContent */
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  spaceEvenly: {
    justifyContent: "space-evenly",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },

  /* alignItems */
  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },

  /* alignSelf */
  alignSelfAuto: {
    alignSelf: "auto",
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
  alignSelfFlexEnd: {
    alignSelf: "flex-end",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignSelfStretch: {
    alignSelf: "stretch",
  },
  alignSelfBaseline: {
    alignSelf: "baseline",
  },

  /* Flexbox */
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  flex9: {
    flex: 9,
  },
  wrap: {
    flexWrap: "wrap",
  },

  /* Text positions */
  textCenter: {
    textAlign: "center",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textJustify: {
    textAlign: "justify",
  },
  textAuto: {
    textAlign: "auto",
  },
});

export default GLOBAL;
