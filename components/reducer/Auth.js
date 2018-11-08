import {
  TEST,
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_SUCCESS,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_INVALID,
  LOADER,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
} from '../Constants';
import jwt_decode from "jwt-decode"

const InitialState = {
  msg: '',
  loginMsg: '',
  loading: false,
  userID: '',
  UserIsLogged: false,
  access_token: '',
  token:'',
  loggedInUser:'',

};

export default (state = InitialState, action) => {
  switch (action.type) {
  case 'REMOVE_TOKEN':
      return {...state,token:'',loggedInUserId:''};
  case 'ACCESS_TOKEN':
      return {...state, token: action.token,loggedInUser:jwt_decode(action.token)};

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginMsg: 'success',
        UserIsLogged: true,
        token: action.payload.access_token,
        loggedInUser:jwt_decode(action.payload.access_token)
      };

    case LOGIN_INVALID:
      return {
        ...state,
        loginMsg: action.payload.data.message,
        userID: action.payload.data.userID,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: 'success',
      };
    case LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_INVALID:
      return {
        ...state,
        msg: action.payload.data.message,
      };

    default:
      return state;
  }
};
