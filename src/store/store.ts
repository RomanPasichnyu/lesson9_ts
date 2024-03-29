import {configureStore} from "@reduxjs/toolkit";
import {loadingReducer} from "./slices";
import {authReducer} from "./slices/authSlice";
import {carReducer} from "./slices/carSlice";

let store = configureStore({
    reducer:{
        loadingReducer,
        auth:authReducer,
        cars:carReducer
    }
});

export {
    store
}

