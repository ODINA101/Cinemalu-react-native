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
	SEARCH_SUCCESS,
	GET_POSTS
} from "../Constants"
import axios from 'axios';

import { AsyncStorage } from 'react-native';


//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmFiYzNlMGE3Zjc2MDEzODY3MDIwY2UiLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ29mYXBwczEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWR6aW5hIiwibGFzdE5hbWUiOiJTYXhhcmFzaHZpbGkiLCJsb2dpbklEIjoiU2F4YXJpY2hpIiwiaWF0IjoxNTQwMDU5MzY2ODQ3LCJleHAiOjE1NDAwNzczNjY4NDd9.QYhzNBXtrE3HA9hcgdBzC-8AQ4rzERlHVoQ1nell_WY"





// export function getUserToken(cb) {
// 	return function (dispatch) {
// 		AsyncStorage.getItem('userToken')
//         .then((data) => {
// 					console.log(data)
// 					cb(data)
//         })
//         .catch((err) => {
// 					console.log(err)
//         })
//
// 	}




export function getUserToken(cb) {
	return function (dispatch) {
		AsyncStorage.getItem('userToken')
        .then((data) => {
					console.log(data)
					dispatch({type:"ACCESS_TOKEN",token:data})
					cb(data)
        })
        .catch((err) => {
					console.log(err)
        })

	}
}







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
		payload:res.data
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


export function GetMovieInfo(movieId,token, callback) {
  return function(dispatch) {
    return axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/' +
          movieId,
      )
      .then(res => {
        console.log(res.data);
        callback(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function SharePost(id,comment,token,cb) {
	return function (dispatch) {
		return axios.put(" http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/share/" + id,{text:comment},	{
				headers: {
					Authorization: 'Bearer ' +
						token,
				},
			})
		.then(res => {
			console.log(res)
			cb()
		}).catch(err => console.log(err.response))
	}
}

export function DeletePost(id,token,cb) {
	return function (dispatch) {
	return	axios.delete('http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/' + id,
				{
					headers: {
						Authorization: 'Bearer ' +
							token,
					},
				},
			)
			.then(res => {
				console.log(this.state.postId);
			  cb()
			})
			.catch(error => console.log(error.response));
	}
}





export function AddPost(id,formData,token,cb) {
	return function (dispatch) {
	return	axios
			.post(
				'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/' +
					id,
				formData,
				{
					headers: {
						Authorization: 'Bearer ' +
							token,
					},
				},
			)
			.then(res => {
				console.log(res);
			  cb()
			});
	}
}



export function EditPost(id,formData,token,cb) {
	return function (dispatch) {
		return axios.put('http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/' +
					id,
					formData,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			)
			.then(res => {
				console.log(res)
	      cb()
			})
			.catch(err => console.log(err.response));
	}
}

export function GetPosts(MovieId,isMakersTab,token,callback) {

	return function (dispatch) {
		return axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/"+ MovieId + "/0/6/" + isMakersTab,
	  {
			headers:{
				'Authorization':'Bearer ' + token
			}
		})
		.then(res => {
        callback(res.data)
			  dispatch({type:GET_POSTS,payload:res.data})
		}).catch(error => {
			console.log(error)
		})
	}
}


export function ReportPost(postId, AlreadyReported,token, cb) {
  return function(dispatch) {
    return axios
      .put(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/report/' +
          postId +
          '/' +
          AlreadyReported,
        {},
        {
          headers: {
            Authorization: 'Bearer ' +
              token,
          },
        },
      )
      .then(res => {
        cb();
        console.log(res);
      })
      .catch(err => console.log(err.response));
  };
}




export function LikePost(postId, cb,token) {
  return function(dispatch) {
    return axios
      .put(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/like/' +
          postId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' +
              token,
          },
        },
      )
      .then(res => {
        cb();
        console.log(res);
      })
      .catch(err => console.log(err.response));
  };
}

export function MovieFollow(MovieId, followed,token) {
  console.log(MovieId);
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
        axios
          .get(
            'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/6/',
            {
              headers: {
                Authorization: 'Bearer ' +
                  token,
              },
            },
          )
          .then(res => {
            console.log(res.data);
            dispatch(GetAllMoviesSuccess(res));
          });
      })
      .catch(error => console.log(error.response));
  };
}

export function GetAllMovies(token) {
  return function(dispatch) {
    return axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/6/',
        {
          headers: {
            Authorization: 'Bearer ' +
              token,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        dispatch(GetAllMoviesSuccess(res));
      });
  };
}

export function Search(query) {
  return function(dispatch) {
    return axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/6/' +
          query,
      )
      .then(res => {
        dispatch(SearchSuccess(res));
      });
  };
}


export function ALLMOVIESLOADMORE(offsetY, callback) {
  return function(dispatch) {
    return axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/search/0/' +
          offsetY +
          '/',
      )
      .then(res => {
        dispatch(getMoreMovies(res));
        callback();
      });
  };
}




export function Login(Email, password) {
  return function(dispatch) {
    dispatch({type: LOADER, payload: true});

    return axios
      .post(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/login',
        {
          username: Email,
          password,
        },
      )
      .then(res => {
        dispatch(LoginSuccess(res));
				AsyncStorage.setItem('userToken', res.data.access_token)
        dispatch({type: LOADER, payload: false});
      })
      .catch(error => {
        console.log(error.response);
        dispatch(LoginInvalid(error.response));
        dispatch({type: LOADER, payload: false});
      });
  };
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
