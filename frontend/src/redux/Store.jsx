import {legacy_createStore as createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension" 
import { loginReducer, logoutReducer, registerReducer } from "./reducers/userReducer"
import { accessChatReducer, allChatUserReducer, searchUserReducer } from "./reducers/chatReducer"

const reducer = combineReducers({
  loginUser : loginReducer,
  registerUser : registerReducer,
  logoutUser : logoutReducer,
  searchUser : searchUserReducer,
  accessChat : accessChatReducer,
  allChats : allChatUserReducer
})

let intitalState = {}
const middleware = [thunk]

const store = createStore(reducer , intitalState , composeWithDevTools(applyMiddleware(...middleware)))

export default store