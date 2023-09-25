import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionType"

export const registerReducer = (state={
    loading:false,
    user:[],
    success:false,
    isRegistered : false
},action) =>{
    const {type,payload} = action

    switch(type){
        case REGISTER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                user : payload,
                isRegistered:true
            }
            case REGISTER_FAIL:
                return{
                    ...state,
                    isRegistered:false,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}

export const loginReducer = (state={
    loading:false,
    user:{},
    success:false,
    isLoggedIn:false
},action) =>{
    const {type,payload} = action

    switch(type){
        case LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                user : payload,
                isLoggedIn:true
            }
            case LOGIN_FAIL:
                return{
                    ...state,
                    isLoggedIn:false,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}