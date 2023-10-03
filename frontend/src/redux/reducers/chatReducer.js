import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS, ADD_USER_TO_GROUP_FAIL, ADD_USER_TO_GROUP_REQUEST, ADD_USER_TO_GROUP_SUCCESS, ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS, CREATE_A_GROUP_CHAT_FAIL, CREATE_A_GROUP_CHAT_REQUEST, CREATE_A_GROUP_CHAT_RESET, CREATE_A_GROUP_CHAT_SUCCESS, DELETE_FROM_GROUP_FAIL, DELETE_FROM_GROUP_REQUEST, DELETE_FROM_GROUP_SUCCESS, RENAME_CHAT_FAIL, RENAME_CHAT_REQUEST, RENAME_CHAT_RESET, RENAME_CHAT_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_RESET, SEARCH_USER_SUCCESS } from "../actionType"



//SEARCH A USER
export const searchUserReducer = (state={
    loading:false,
    users:[],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case SEARCH_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case SEARCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                users : payload,
            }
            case SEARCH_USER_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
              case SEARCH_USER_RESET:
                return{
                   loading:false,
                   users:[],
                   success : false
                }  
                default:
                    return {...state}
    }
}


export const accessChatReducer = (state={
    loading:false,
    users:[],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case ACCESS_CHAT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ACCESS_CHAT_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                users : payload.users,
            }
            case ACCESS_CHAT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}
export const allChatUserReducer = (state={
    loading:false,
     allchats : [],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case ALL_CHATS_OF_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ALL_CHATS_OF_USER_SUCCESS:
            return{
                loading:false,
                success:true,
               allChats : payload,
            }
            case ALL_CHATS_OF_USER_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}


export const createAGroupChatReducer = (state={
    loading:false,
    fullGroupChat :{},
    message : "",
    groupChatCreated : false

},action) =>{
    const {type,payload} = action

    switch(type){
        case CREATE_A_GROUP_CHAT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case CREATE_A_GROUP_CHAT_SUCCESS:
            return{
               loading : false,
               message : payload.message,
               fullGroupChat : payload.fullGroupChat,
               groupChatCreated : true
            }
            case CREATE_A_GROUP_CHAT_FAIL:
                return{
                    ...state,
                    loading : false,
                    error:payload
                }
              case CREATE_A_GROUP_CHAT_RESET:
                return{
                    loading:true,
                    fullGroupChat:{},
                    message :"",
                    groupChatCreated:false
                }  
                default:
                    return {...state}
    }
}

//rename Chat
export const renameChatReducer = (state={
    loading:false,
    isUpdated : false,
    updatedGroupChat : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case RENAME_CHAT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case RENAME_CHAT_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated : true,
                updatedGroupChat : payload
            }
            case RENAME_CHAT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
            case RENAME_CHAT_RESET:
                return{
                    loading:false,
                    isUpdated : false,
                    updatedGroupChat : {}
                }
                default:
                    return {...state}
    }
}


//ADD USER TO GROUP:-
export const addUserGroupReducer = (state={
    loading:false,
    isAdded : false,
    newMember : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case ADD_USER_TO_GROUP_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ADD_USER_TO_GROUP_SUCCESS:
            return{
                ...state,
                loading:false,
                isAdded : true,
                newMember : payload.newMember
            }
            case ADD_USER_TO_GROUP_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}

//REMOVE FROM GROUP
export const removeUserGroupReducer = (state={
    loading:false,
    isremoved : false,
    removedMember : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case DELETE_FROM_GROUP_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_FROM_GROUP_SUCCESS:
            return{
                ...state,
                loading:false,
                isremoved : true,
                removedMember : payload
            }
            case DELETE_FROM_GROUP_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}