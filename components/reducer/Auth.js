import {TEST,REGISTERSUCCESS,REGISTERINVALID,LOADER} from "../Constants"

const InitialState = {
  msg:"",
  loading:false
}



export default (state=InitialState,action) => {
 switch (action.type) {
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
