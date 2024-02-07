import {legacy_createStore as createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension" 
import { allUsersReducer, loginReducer, logoutReducer, registerReducer } from "./reducers/userReducer"
import { accessChatReducer, addUserGroupReducer, allChatUserReducer, createAGroupChatReducer,getPublicGroupUserReducer,joinAGroup,removeUserGroupReducer,renameChatReducer, searchAGroup, searchUserReducer } from "./reducers/chatReducer"
import { allMessagesReducer, sendMessagesReducer,  } from "./reducers/messageReducer"

const reducer = combineReducers({
  loginUser : loginReducer,
  registerUser : registerReducer,
  logoutUser : logoutReducer,
  searchUser : searchUserReducer,
  accessChat : accessChatReducer,
  allChats : allChatUserReducer,
  createGroupChat : createAGroupChatReducer,
  renameChat : renameChatReducer,
  addUserGroup : addUserGroupReducer,
  deleteUserGroup : removeUserGroupReducer,
  sendMessage : sendMessagesReducer,
  allMessages : allMessagesReducer,
  searchGroup : searchAGroup,
  joinAGroup : joinAGroup,
  getAllUsers : allUsersReducer,
  getPublicGroupUser : getPublicGroupUserReducer
})

let intitalState = {}
const middleware = [thunk]

const store = createStore(reducer , intitalState , composeWithDevTools(applyMiddleware(...middleware)))

export default store