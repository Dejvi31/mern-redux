import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
