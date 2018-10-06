import {TEST,GET_ALL_MOVIES_SUCCESS,ALL_MOVIES_LOAD_MORE_SUCCESS,SEARCH_SUCCESS,
GET_POSTS} from "../Constants"

const InitialState = {
 allMovies:[],
 MoviePosts:[]
}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {
 case "TST":
  return state;
case SEARCH_SUCCESS:
  return {
    ...state,
    allMovies:action.movies
  }
case GET_ALL_MOVIES_SUCCESS:
   return {
    ...state,
    allMovies:action.movies
   };
 case ALL_MOVIES_LOAD_MORE_SUCCESS:
    return {
     ...state,
     allMovies:action.movies
    };
 case GET_POSTS:
   return {
     ...state,
     MoviePosts:action.payload
   }
default:
  return state;
 }
}
