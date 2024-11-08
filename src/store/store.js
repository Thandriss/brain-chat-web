import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../service/slice";


const rootReducer = combineReducers({
  slice: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
