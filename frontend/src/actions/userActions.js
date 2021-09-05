import axios from "axios";
import { USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REG_CLEAR } from "../constants/userConstants.js";


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
};

export const register = (name, email, password, rePassword) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST
      });

      const response = await axios({
         url: "/api/users",
         method: "POST",
         headers: {"Content-Type": "application/json"},
         data: { name, email, password, rePassword }
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