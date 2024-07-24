import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export { store }