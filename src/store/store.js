import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../service/slice";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root", 
  storage,     
};

const rootReducer = combineReducers({
  slice: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); 

export default store;