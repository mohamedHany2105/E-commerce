import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    signInStart: (state) => {
        state.loading=true;
        state.error=false
    },
    signInSuccess: (state,action) => {
        state.currentUser=action.payload
        state.error=null;
        state.loading=false;
    },
    signInFailure: (state,action) => {
        state.error=action.payload;
        state.loading=false;
    },
    updateUserStart:(state)=>{
        state.loading=true;
        state.error=false
    },
    updateUserSuccess:(state,action)=>{
        state.currentUser=action.payload
        state.error=null;
        state.loading=false;
    },
    updateUserFailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    signOutUserStart:(state)=>{
        state.loading=true;
        state.error=false
    },
    signOutUserSuccess:(state)=>{
        state.currentUser=null
        state.error=null;
        state.loading=false;
    },
    signOutUserFailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess, updateUserFailure, signOutUserStart,signOutUserSuccess,signOutUserFailure } = userSlice.actions;

export default userSlice.reducer;
