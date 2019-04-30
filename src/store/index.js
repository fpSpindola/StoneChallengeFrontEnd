import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/index";
import thunkMiddleware from 'redux-thunk';


// export const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        // loggerMiddleware // neat middleware that logs actions
    )
);

window.store = store;