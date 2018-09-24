import {TEST,GETALLMOVIESSUCCESS} from "../Constants"

const InitialState = {
}



export default (state=InitialState,action) => {
 switch (action.type) {
 case TEST:
   console.log(TEST)
   return state;

 default:
  return state;
 }
}
