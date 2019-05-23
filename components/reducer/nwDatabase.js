import {TEST,GET_TRENDING_MOVIES,GET_BLOG_POSTS,GET_FEATURED_DATA,GET_TRENDING_POSTS} from "../Constants"

const InitialState = {
 upcomingMovies:[],
 releasedMovies:[],
 blogPosts:[],
 featuredData:{},
 trendingPosts:[]

}



export default (state=InitialState,action) => {
  console.log(action)
 switch (action.type) {
 case GET_FEATURED_DATA:
    return {
      ...state,
      featuredData:action.payload
    }
 case GET_TRENDING_MOVIES:
   return {
     ...state,
     upcomingMovies:action.payload.upcomingMovies,
     releasedMovies:action.payload.releasedMovies,
   }
 case GET_TRENDING_POSTS:
     return {
       ...state,
       trendingPosts:action.payload
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
