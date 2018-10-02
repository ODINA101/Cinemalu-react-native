import {TEST,
	GET_ALL_MOVIES,
	GET_ALL_MOVIES_SUCCESS,
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_INVALID,
	LOADER,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
	ALL_MOVIES_LOADMORE,
	ALL_MOVIES_LOAD_MORE_SUCCESS,
	SEARCH_SUCCESS
} from "../Constants"
import axios from 'axios';

export function testfun(res) {
	return {
		type: TEST,
		moviesGenres: []
	};
}

export function getMoreMovies(res) {
  return {
    type:ALL_MOVIES_LOAD_MORE_SUCCESS,
    movies:res.data
  }
}


export function GetAllMoviesSuccess(res) {
  return {
    type:GET_ALL_MOVIES_SUCCESS,
    movies:res.data
  }
}

export function RegSuccess(res) {
	return {
		type:REGISTER_SUCCESS,
		payload:res
	}
}


export function RegInvalid(res) {
	return {
		type:REGISTER_INVALID,
		payload:res
	}
}



export function LoginSuccess(res) {
	console.log(res)
	return {
		type:LOGIN_SUCCESS,
		payload:res
	}
}


export function LoginInvalid(res) {
	return {
		type:LOGIN_INVALID,
		payload:res
	}
}

export function SearchSuccess(res) {
	return {
		type:SEARCH_SUCCESS,
		movies:res.data
	}
}




export function GetAllMovies() {

return function (dispatch) {
  return axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/6/")
  .then(res => {
    dispatch(GetAllMoviesSuccess(res))
  })
 }

}

export function Search(query) {

return function (dispatch) {
	return axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/6/" + query)
	.then(res => {
		dispatch(SearchSuccess(res))
	})
}

}


export function ALLMOVIESLOADMORE(offsetY,callback) {

return function (dispatch) {
  return axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/" + offsetY + "/")
  .then(res => {
    dispatch(getMoreMovies(res))
		callback()
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
