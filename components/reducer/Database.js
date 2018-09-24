import {TEST,GETALLMOVIESSUCCESS} from "../Constants"

const InitialState = {
 allMovies:[]
}



export default (state=InitialState,action) => {
 switch (action.type) {
 case GETALLMOVIESSUCCESS:
   return {
    ...state,
    allMovies:action.movies
   };


 default:
  return state;
 }
}
