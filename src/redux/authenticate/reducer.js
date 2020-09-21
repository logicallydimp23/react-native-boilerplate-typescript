import * as types from "./action-types"

const initialState = {
  isAuth: false,
  requestingAuth: false,
  requestingSignup: false,
  clearingAuth: false,
  authSession: null,
  authError: "",
  signupError: [],
  requestingRestore: true,
  logoutError: "",
  isRequestingLogOut: false,
  isLoggingOut: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.RESTORE_REQUEST:
      return {
        ...state,
        requestingRestore: true,
      }
    case types.RESTORE_SUCCESS:
      return {
        ...state,
        requestingRestore: false,
        isAuth: true,
        authSession: action.payload.session,
      }
    case types.RESTORE_FAILED:
      return {
        ...state,
        requestingRestore: false,
      }
    case types.LOGIN_REQUEST:
      return {
        ...state,
        requestingAuth: true,
        authError: "",
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        requestingAuth: false,
        isAuth: true,
        authSession: action.payload.session,
        requestingRestore: false,
      }
    case types.LOGIN_FAILED:
      return {
        ...state,
        requestingAuth: false,
        authError: action.payload.error,
      }
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isRequestingLogOut: true,
      }
    case types.LOGOUT_CANCEL:
      return {
        ...state,
        isRequestingLogOut: false,
      }
    case types.LOGOUT_PROCESSING:
      return {
        ...state,
        isLoggingOut: true,
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        authSession: null,
        isRequestingLogOut: false,
        isLoggingOut: false,
      }
    default:
      return state
  }
}
