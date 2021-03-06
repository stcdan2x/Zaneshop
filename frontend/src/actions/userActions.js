import axios from "axios";
import { ORDER_LIST_USER_RESET } from "../constants/orderConstants.js";
import { USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_FAIL, USER_LOGOUT,
   USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REG_CLEAR,
   USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_DETAILS_RESET,
   USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from "../constants/userConstants.js";


export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST
      });

      const response = await axios({
         url: "/api/users/login",
         method: "POST",
         headers: {"Content-Type": "application/json"},
         data: { email, password }
      });

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: response.data
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));

   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const logout = () => (dispatch) => {
   localStorage.removeItem("userInfo");
   dispatch({ type: USER_LOGOUT });
   dispatch({ type: USER_REG_CLEAR });
   dispatch({ type: USER_UPDATE_PROFILE_RESET });
   dispatch({ type: USER_DETAILS_RESET });
   dispatch({ type: ORDER_LIST_USER_RESET })
   dispatch({ type: USER_LIST_RESET })
};

export const register = (name, email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST
      });

      const response = await axios({
         url: "/api/users",
         method: "POST",
         headers: {"Content-Type": "application/json"},
         data: { name, email, password }
      });

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: response.data
      });

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: response.data
      });  

      localStorage.setItem("userInfo", JSON.stringify(response.data));

   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/users/${id}`,
         method: "GET",
         headers: {
            "Content-Type": "application/json" ,
            Authorization: `Bearer ${userInfo.token}`
         }
      });

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: response.data
      });

   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const updateProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_PROFILE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: "/api/users/profile",
         method: "PUT",
         headers: {
            "Content-Type": "application/json" ,
            Authorization: `Bearer ${userInfo.token}`
         },
         data: user 
      });

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         payload: response.data,
       })

       dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: response.data,
       })

       localStorage.setItem("userInfo", JSON.stringify(response.data))
      
/*       const config = {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`,
         },
       }
   
       const { data } = await axios.put(`/api/users/profile`, user, config)
       console.log(data);
       dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         payload: data,
       })

       dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
       })

       localStorage.setItem("userInfo", JSON.stringify(data)) */

   } catch (error) {
      dispatch({
         type: USER_UPDATE_PROFILE_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: "/api/users",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      });

      dispatch({
         type: USER_LIST_SUCCESS,
         payload: response.data,
       })

   } catch (error) {
      dispatch({
         type: USER_LIST_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const deleteUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/users/${id}`,
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      });

      dispatch({
         type: USER_DELETE_SUCCESS,
         payload: response.data
       })

   } catch (error) {
      dispatch({
         type: USER_DELETE_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const updateUser = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/users/${user._id}`,
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
         data: user
      });

      dispatch({
         type: USER_UPDATE_SUCCESS,
       })

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: response.data
      })

      dispatch({
         type: USER_DETAILS_RESET
      })

   } catch (error) {
      dispatch({
         type: USER_UPDATE_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};