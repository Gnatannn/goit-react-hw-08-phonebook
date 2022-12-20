import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// add JSON Web Token
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// remove JSON Web Token
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// POST to /users/signup
// body: { name, email, password }

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST to /users/login
// body: { email, password }

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      // add the token to the HTTP header after successful login,
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST to /users/logout
// headers: Authorization: Bearer token

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    // remove the token from the HTTP header after a successful logout,
    clearAuthHeader();
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// GET from /users/current
// headers: Authorization: Bearer token

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // check the token from the state with getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // exit without a request without token
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // add a token to the HTTP header and perform the request if there is a token
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
