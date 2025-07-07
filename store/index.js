import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import questionnaireReducer from './questionnaireSlice';

const rootReducer = combineReducers({
    questionnaire: questionnaireReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['questionnaire'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
