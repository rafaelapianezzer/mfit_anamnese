import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "./user/userReducer";
import {modelsReducer} from "./models/modelsReducer";
import anamnesesReducer from './anamneses/anamnesesReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    models: modelsReducer,
    anamneses: anamnesesReducer,
   
});
