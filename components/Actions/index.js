import {TEST,GETALLMOVIES,GETALLMOVIESSUCCESS} from "../Constants"
import axios from 'axios';

export function testfun(res) {
	return {
		type: TEST,
		moviesGenres: []
	};
}



export function GetAllMoviesSuccess(res) {
  return {
    type:GETALLMOVIESSUCCESS,
    movies:res.data
  }
}



export function GetAllMovies() {

return function (dispatch) {
  return axios.get("https://api.cinemalu.com/api/movies/search/0/6/")
  .then(res => {
    dispatch(GetAllMoviesSuccess(res))
  })
 }

}
