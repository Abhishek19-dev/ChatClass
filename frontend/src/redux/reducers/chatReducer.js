import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS, ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS } from "../actionType"



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