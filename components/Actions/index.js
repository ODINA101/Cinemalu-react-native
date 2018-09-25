import {TEST,GETALLMOVIES,GETALLMOVIESSUCCESS,REGISTER,REGISTERSUCCESS,REGISTERINVALID,LOADER} from "../Constants"
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

export function RegSuccess(res) {
	return {
		type:REGISTERSUCCESS,
		payload:res
	}
}


export function RegInvalid(res) {
	return {
		type:REGISTERINVALID,
		payload:res
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






export function Reg(email,firstName,lastName,loginID,password) {
	return function (dispatch) {
		dispatch({type:LOADER,payload:true})
		return axios.post("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/create",
		{
		 email,
		 firstName,
		 lastName,
		 loginID,
		 password
	 }).then(res => {
		 dispatch(RegSuccess(res))
		 dispatch({type:LOADER,payload:false})

	 }).catch(error => {
		 dispatch(RegInvalid(error.response))
		 dispatch({type:LOADER,payload:false})

	 })
	}
}
