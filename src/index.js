import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from "redux-thunk";
import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import {Provider} from "react-redux";
import productsReducer from "./store/reducers/productsReducer";
import saleReducer from "./store/reducers/saleReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    products: productsReducer,
    sale: saleReducer
})

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();