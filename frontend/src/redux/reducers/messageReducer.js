import { ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_RESET, SEND_MESSAGE_SUCCESS } from "../actionType"

export const sendMessagesReducer = (state={
    loading:false,
    isSent : false,
    message : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case SEND_MESSAGE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                isSent : true,
                message : payload.message
            }
            case SEND_MESSAGE_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                case SEND_MESSAGE_RESET:
                 return{
                    ...state,
                    isSent:false,
                    message:""
                 }
                default:
                    return {...state}
    }
}


//all messages with user:-
export const allMessagesReducer = (state={
    loading:false,
    isReceived : false,
    messages : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case ALL_MESSAGES_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ALL_MESSAGES_SUCCESS:
            return{
                ...state,
                loading:false,
                isReceived : true,
                messages : payload.messages
            }
            case ALL_MESSAGES_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                // case SEND_MESSAGE_RESET:
                //  return{
                //     ...state,
                //     isSent:false,
                //     message:""
                //  }
                default:
                    return {...state}
    }
}