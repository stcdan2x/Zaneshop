import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_USER_FAIL, ORDER_LIST_USER_REQUEST, ORDER_LIST_USER_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants.js";




export const createOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_CREATE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();
   
      const response = await axios({
         url: "/api/orders",
         method: "POST",
         headers: {
            "Content-Type": "application/json" ,
            Authorization: `Bearer ${userInfo.token}`
         },
         data: order 
      });

      dispatch({
         type: ORDER_CREATE_SUCCESS,
         payload: response.data
       })

   } catch (error) {
      dispatch({
         type: ORDER_CREATE_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DETAILS_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/orders/${id}`,
         method: "GET",
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },  
      });

      dispatch({
         type: ORDER_DETAILS_SUCCESS,
         payload: response.data
       })

   } catch (error) {
      dispatch({
         type: ORDER_DETAILS_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_PAY_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/orders/${orderId}/pay`,
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
         data: paymentResult
      });

      dispatch({
         type: ORDER_PAY_SUCCESS,
         payload: response.data
       })

   } catch (error) {
      dispatch({
         type: ORDER_PAY_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const listUserOrders = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_LIST_USER_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/orders/myorders`,
         method: "GET",
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      });

      dispatch({
         type: ORDER_LIST_USER_SUCCESS,
         payload: response.data
       })

   } catch (error) {
      dispatch({
         type: ORDER_LIST_USER_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const listAllOrders = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_LIST_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: "/api/orders",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         },
      });

      dispatch({
         type: ORDER_LIST_SUCCESS,
         payload: response.data,
       })

   } catch (error) {
      dispatch({
         type: ORDER_LIST_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DELIVER_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const response = await axios({
         url: `/api/orders/${order._id}/deliver`,
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
         data: {}
      });

      dispatch({
         type: ORDER_DELIVER_SUCCESS,
         DELIVERload: response.data
       })

   } catch (error) {
      dispatch({
         type: ORDER_DELIVER_FAIL,
         payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
   }
};