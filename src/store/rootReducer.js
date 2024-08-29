import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import modelsReducer from "../features/modelSlice";

export const rootReducer = combineReducers({
    user: userReducer,
    models: modelsReducer,
});
