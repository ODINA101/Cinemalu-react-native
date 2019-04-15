import {TEST,
GET_TRENDING_MOVIES
} from "../Constants"
import axios from 'axios';


export function getTrendingMovies(cb) {
	return function (dispatch) {
	axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/load/trending-movies")
        .then((res) => {
					console.log(res)
					dispatch({type:GET_TRENDING_MOVIES,payload:res.data})
					cb(res)
        })
        .catch((err) => {
					alert(err)
        })

	}
}
