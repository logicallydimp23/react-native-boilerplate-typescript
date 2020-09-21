import { combineReducers } from "redux"
import authenticate from "./authenticate/reducer"
import transaction from "./main/transaction/reducer"
import orientationProvider from "./providers/orientation/reducer"

const rootReducer = combineReducers({
  authenticate,
  transaction,
  orientationProvider,
})

export default rootReducer;
