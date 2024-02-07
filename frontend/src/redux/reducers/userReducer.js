import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  EDIT_DESCRIPTION_FAIL,
  EDIT_DESCRIPTION_REQUEST,
  EDIT_DESCRIPTION_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_RESET,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOGIN,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actionType";

export const registerReducer = (
  state = {
    loading: false,
    user: [],
    success: false,
    isRegistered: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: payload,
        isRegistered: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isRegistered: false,
        loading: false,
        error: payload,
      };
    case REGISTER_LOGIN:
      return {
        isRegistered: true,
      };
    default:
      return { ...state };
  }
};

export const loginReducer = (
  state = {
    loading: false,
    user: {},
    success: false,
    isActive: false,
    isLoggedIn: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isActive: true,
        isLoggedIn: true,
        success: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: payload,
      };
    case LOGIN_RESET:
      return {
        isLoggedIn: false,
        isActive: false,
        user: [],
      };
    default:
      return { ...state };
  }
};

//Logout a user
export const logoutReducer = (
  state = {
    loading: false,
    isLoggedOut: false,
    message: "",
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isLoggedOut: true,
        message: payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: payload,
      };
    case LOGOUT_RESET:
      return {
        ...state,
        loading: false,
        isLoggedOut: false,
        message: "",
      };
    default:
      return { ...state };
  }
};

//Get all users
export const allUsersReducer = (
  state = {
    loading: false,
    users: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: payload,
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return { ...state };
  }
};

//Edit description
export const editDescriptionReducer = (
  state = {
    loading: false,
    editDescription: false,
    editUser: {},
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case EDIT_DESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_DESCRIPTION_SUCCESS:
      return {
        loading: false,
        editDescription: true,
        editUser: payload.editUser,
      };
    case EDIT_DESCRIPTION_FAIL:
      return {
        ...state,
        editDescription: false,
        editUser: {},
      };
    default:
      return { ...state };
  }
};



//GET ALL USER DETAILS

export const getAllDetailsReducer = (
    state = {
      loading: false,
      userDetails:{}
    },
    action
  ) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_USER_DETAILS_SUCCESS:
        return {
          loading: false,
           userDetails : payload.userDetails
        };
      case GET_USER_DETAILS_FAIL:
        return {
          ...state,
         userDetails : {}
        };
      default:
        return { ...state };
    }
  };

//edit profile
  export const editProfileReducer = (
    state = {
      loading: false,
      editProfile: false,
    },
    action
  ) => {
    const { type, payload } = action;
  
    switch (type) {
      case EDIT_DESCRIPTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case EDIT_DESCRIPTION_SUCCESS:
        return {
          loading: false,
          editProfile: true,
        };
      case EDIT_DESCRIPTION_FAIL:
        return {
          ...state,
          editProfile: false,
        };
      default:
        return { ...state };
    }
  };