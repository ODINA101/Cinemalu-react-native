import {TEST,
  GETALLMOVIES,
	GETALLMOVIESSUCCESS,
	REGISTER,
	REGISTERSUCCESS,
	REGISTERINVALID,
	LOADER,
  LOGININVALID,
  LOGINSUCCESS} from "../Constants"

const InitialState = {
  msg:"",
  loginMsg:"",
  loading:false,
  userID:""
}



export default (state=InitialState,action) => {
 switch (action.type) {
 case LOGINSUCCESS:
   return {
     ...state,
     loginMsg:"success"
   }

case LOGININVALID:
 return {
   ...state,
   loginMsg:action.payload.data.message,
   userID:action.payload.data.userID

 }

 case REGISTERSUCCESS:
   return {
     ...state,
     msg:"success"
   }
 case LOADER:
   return {
     ...state,
     loading:action.payload
   }
 case REGISTERINVALID:
   return {
     ...state,
     msg:action.payload.data.message
   };

 default:
  return state;
 }
}
