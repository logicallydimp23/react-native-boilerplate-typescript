import * as types from "./action-types"

const initialState = {
  view: "",
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_INITITIAL_ORIENTATION:
      return {
        ...state,
        view: action.payload.orientation,
      }
    case types.SET_ORIENTATION:
      return {
        ...state,
        view: action.payload.orientation,
      }
    case types.RESET_ORIENTATION:
      return {
        ...state,
        view: "",
      }
    default:
      return state
  }
}
