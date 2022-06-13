import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit'

import { redux, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useReducer from './store/reducers/reducers';


const rootPersistConfig = {
    key: 'root',
    storage: storage,
}



const rootReducer = combineReducers({
    registerJob: useReducer,
})


const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export default store;