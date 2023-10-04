import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./states"
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import {
  persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,
PURGE,REGISTER} from "redux-persist"
import  {PersistGate} from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig= {key:"root",storage ,version: 1};
const presistedReducer=persistReducer(persistConfig,authReducer);
const store= configureStore({
  reducer: presistedReducer ,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{ignoredActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,
      PURGE,REGISTER]}
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistStore(store)}>
  <App />
  </PersistGate>
  
  </Provider>
   
  </React.StrictMode>
);


