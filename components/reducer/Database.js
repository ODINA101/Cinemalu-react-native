import {TEST,GETALLMOVIESSUCCESS} from "../Constants"

const InitialState = {
 allMovies:[]
}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {
 case "TST":
   console.log("jandabaaa")
  return state;
 case GETALLMOVIESSUCCESS:

   return {
    ...state,
    allMovies:action.movies
   };


 default:
  return state;
 }
}
