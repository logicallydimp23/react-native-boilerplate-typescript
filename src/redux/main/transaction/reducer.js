import * as types from "./action-types"

const initialState = {
  open: false,
  type: "member",
  quantity: "",
  openAlert: false,
  alertType: "success",
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TRANSACTION:
      return {
        ...state,
        open: true,
        type: action.payload.type,
      }
    case types.SAVE_TRANSACTION:
      return {
        ...state,
        open: false,
        type: action.payload.type,
        quantity: action.payload.quantity,
        openAlert: true,
        alertType: "success",
      }
    case types.CANCEL_TRANSACTION:
      return {
        ...state,
        open: false,
        type: "member",
        quantity: "",
        openAlert: true,
        alertType: "cancelled",
      }
    case types.SET_QUANTITY:
      return {
        ...state,
        quantity: action.payload.quantity,
      }
    case types.CLOSE_TRANSACTION_ALERT:
      return {
        ...state,
        openAlert: false,
      }
    default:
      return state
  }
}
