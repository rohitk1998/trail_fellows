import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth.slice';
import chatSlice from './slice/chat.slice';
import appSlice from './slice/app.slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const reducers = combineReducers({
    auth : authSlice,
    chat : chatSlice,
    app  : appSlice 
});
 
 const persistConfig = {
     key: 'root',
     storage
 };
 
 const persistedReducer = persistReducer(persistConfig, reducers);

 export const store = configureStore({ reducer : persistedReducer });

 export const getState = ()=> store.getState(); 

 export const persister = persistStore(store)