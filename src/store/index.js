import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from './currency-slice-action'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: {
        currency: currencyReducer,
    }
});

export default store;