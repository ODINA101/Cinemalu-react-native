import {TEST,
GET_TRENDING_MOVIES,
GET_TRENDING_POSTS,
GET_BLOG_POSTS,
GET_FEATURED_DATA
} from "../Constants"
import axios from 'axios';




export function getTrendingPosts(y) {
	return function (dispatch) {
	axios.post("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/load/trending-posts/0/" + y)
        .then((res) => {
					console.log(res)
					dispatch({type:GET_TRENDING_POSTS,payload:res.data})
        })
        .catch((err) => {
					alert(err)
        })

	}
}

export function getTrendingMovies() {
	return function (dispatch) {
	axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/load/trending-movies")
        .then((res) => {
					console.log(res)
					dispatch({type:GET_TRENDING_MOVIES,payload:res.data})
        })
        .catch((err) => {
					alert(err)
        })

	}
}


export function MovieFollow(MovieId, followed,token) {
  console.log(MovieId);
	console.log(followed);
	console.log(token)
  return function(dispatch) {
    return axios
      .put(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/interested/' +
          MovieId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' +
              token,
          },
        },
      )
      .then(res => {
        console.log(res);
	      getTrendingMovies()

      })
      .catch(error => alert(error.response));
  };
}




export function getFeaturedData(cb) {
	return function (dispatch) {
	axios.get(" http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/blog/load/featured-data")
        .then((res) => {
					console.log(res)
					dispatch({type:GET_FEATURED_DATA,payload:res.data})
					cb()
        })
        .catch((err) => {
					alert(err)
        })

	}
}





export function getBlogPosts(y) {
	return function (dispatch) {
	axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/blog/load/0/" + y)
        .then((res) => {
					console.log(res)
					dispatch({type:GET_BLOG_POSTS,payload:res.data})
        })
        .catch((err) => {
					alert(err)
        })

	}
}
