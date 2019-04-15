import {TEST,GET_TRENDING_MOVIES} from "../Constants"

const InitialState = {
 upcomingMovies:[],
 releasedMovies:[]
}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {

 case GET_TRENDING_MOVIES:
   return {
     ...state,
     upcomingMovies:action.payload.upcomingMovies,
     releasedMovies:action.payload.releasedMovies

   }
  default:
    return state;
   }
}
