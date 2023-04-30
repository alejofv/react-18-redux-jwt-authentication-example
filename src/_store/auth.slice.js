import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetchWrapper, history} from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    // initialize state from local storage to enable user to stay logged in
    const token = JSON.parse(localStorage.getItem('token'));

    return {
        token: token,
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.token = null;
        localStorage.removeItem('token');

        history.navigate('/login');
    }
}

function createExtraActions() {
    //const baseUrl = process.env.SCHRYVER_AUTH_API_URL;
    const baseUrl = 'http://localhost:8080';

    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await fetchWrapper.post(`${baseUrl}/v1/auth/login`, { username, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const token = action.payload;
                
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);

                state.token = token;

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
