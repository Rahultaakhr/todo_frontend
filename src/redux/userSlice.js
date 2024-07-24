import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: JSON.parse(localStorage.getItem("authUser")) || null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.authUser = action.payload
            localStorage.setItem("authUser",JSON.stringify(state.authUser))
        }
    }
})
export const {setAuthUser}=userSlice.actions
export default userSlice.reducer