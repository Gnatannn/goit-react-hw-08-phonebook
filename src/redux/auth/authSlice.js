import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from 'redux/auth/operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  authErrorRegister: null,
  authErrorLogIn: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateErrorLogIn(state, action) {
      state.authErrorLogIn = action.payload;
    },
    updateErrorRegister(state, action) {
      state.authErrorRegister = action.payload;
    },
  },
  extraReducers: {
    [register.pending](state) {
      state.authErrorRegister = null;
    },
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authErrorRegister = null;
    },
    [register.rejected](state, action) {
      state.isLoggedIn = false;
      state.authErrorRegister = action.payload;
    },
    [logIn.pending](state) {
      state.authErrorLogIn = null;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authErrorLogIn = null;
    },
    [logIn.rejected](state, action) {
      state.isLoggedIn = false;
      state.authErrorLogIn = action.payload;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
    },
  },
});

export const { updateErrorLogIn, updateErrorRegister } = authSlice.actions;

export const authReducer = authSlice.reducer;
