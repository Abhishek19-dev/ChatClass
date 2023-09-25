import {legacy_createStore as createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension" 
import { loginReducer, registerReducer } from "./reducers/userReducer"

const reducer = combineReducers({
  loginUser : loginReducer,
  registerUser : registerReducer
})

let intitalState = {}
const middleware = [thunk]

const store = createStore(reducer , intitalState , composeWithDevTools(applyMiddleware(...middleware)))

export default store