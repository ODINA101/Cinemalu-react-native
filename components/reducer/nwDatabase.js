import {TEST,GET_TRENDING_MOVIES,GET_BLOG_POSTS} from "../Constants"

const InitialState = {
 upcomingMovies:[],
 releasedMovies:[],
 blogPosts:[]

}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {

 case GET_TRENDING_MOVIES:
   return {
     ...state,
     upcomingMovies:action.payload.upcomingMovies,
     releasedMovies:action.payload.releasedMovies,
   }

 case GET_BLOG_POSTS:
    return {
      ...state,
      blogPosts:action.payload
    }
  default:
    return state;
   }
}
