import {TEST,
GET_TRENDING_MOVIES,
GET_BLOG_POSTS
} from "../Constants"
import axios from 'axios';


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




export function getBlogPosts() {
	return function (dispatch) {
	axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/blog/load/0/9")
        .then((res) => {
					console.log(res)
					dispatch({type:GET_BLOG_POSTS,payload:res.data})
        })
        .catch((err) => {
					alert(err)
        })

	}
}
