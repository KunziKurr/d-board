import '../styles/master.css'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from '../store'
import React from 'react'
import { Provider } from 'react-redux'

let persistor = persistStore(store);



function MyApp({ Component, pageProps }) {
  return ( 
    <React.StrictMode>
        <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps }/>     
        </PersistGate>
      </Provider>
      </React.StrictMode>
    )
}

export default MyApp