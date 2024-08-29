import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger
].filter(Boolean);

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleWares)
});

export const persistor = persistStore(store); 





// quando clicar no botao de add anamnese pro aluno, copia a anamnese que ta no modelo, adicionar o email do aluno
// e depois adicionar a anamnese em um reducer e anamneses que vai ser uma lista de anamneses
