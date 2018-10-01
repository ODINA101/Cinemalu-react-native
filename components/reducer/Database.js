import {TEST,GET_ALL_MOVIES_SUCCESS,ALL_MOVIES_LOAD_MORE_SUCCESS} from "../Constants"

const InitialState = {
 allMovies:[]
}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {
 case "TST":
  return state;
case GET_ALL_MOVIES_SUCCESS:

   return {
    ...state,
    allMovies:action.movies
   };
 case ALL_MOVIES_LOAD_MORE_SUCCESS:
  console.log("fucking wooooorks")
    return {
     ...state,
     allMovies:action.movies
    };

 default:
  return state;
 }
}
