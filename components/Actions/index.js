import {TEST,
	GETALLMOVIES,
	GETALLMOVIESSUCCESS,
	REGISTER,
	REGISTERSUCCESS,
	REGISTERINVALID,
	LOADER,
  LOGININVALID,
  LOGINSUCCESS
} from "../Constants"
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



export function LoginSuccess(res) {
	console.log(res)
	return {
		type:LOGINSUCCESS,
		payload:res
	}
}


export function LoginInvalid(res) {
	return {
		type:LOGININVALID,
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



export function Login(Email,password) {
	return function(dispatch) {
		dispatch({type:LOADER,payload:true})

	  return axios.post("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/login",
	{
		username:Email,
		password
	}).then(res => {
		dispatch(LoginSuccess(res))
		dispatch({type:LOADER,payload:false})
	}).catch(error => {
		console.log(error.response)
		dispatch(LoginInvalid(error.response))
  dispatch({type:LOADER,payload:false})

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
		 console.log(res)
		 dispatch(RegSuccess(res))
		 dispatch({type:LOADER,payload:false})

	 }).catch(error => {
		 dispatch(RegInvalid(error.response))
		 dispatch({type:LOADER,payload:false})

	 })
	}
}
