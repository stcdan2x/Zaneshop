import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer
});

const storageCartItems = localStorage.getItem("cartItems") 
   ? JSON.parse(localStorage.getItem("cartItems"))
   : [];
const storageUserInfo = localStorage.getItem("userInfo") 
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;

const initialState = {
   cart: { cartItems: storageCartItems },
   userLogin: { userInfo: storageUserInfo },
   userRegister: { userInfo: storageUserInfo }
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools( applyMiddleware( ...middleware ) )
);

export default store;