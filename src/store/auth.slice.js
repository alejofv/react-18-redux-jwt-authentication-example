import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history } from 'helpers';
import { authService } from "services";
import jwtDecode from "jwt-decode";

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

// selectors
// These "custom" selectors help to reshape the state for specific usages.
// See https://redux.js.org/usage/deriving-data-selectors#define-selectors-alongside-reducers
export const selectJwt = state => state.auth.token.access_token;
export const selectProfileFromJwt = state => {
    const jwt = state.auth.token.access_token;
    const claims = jwtDecode(jwt);

    return {
        userId: claims.cd_identityUsuario,
        userName: claims.nb_nombreUsuario,
    };
}

// implementation

function createInitialState() {
    // initialize state from local storage to enable user to stay logged in
    let token = JSON.parse(localStorage.getItem('token'));

    if (!(token?.access_token)) {
        // local storage key is not valid
        localStorage.removeItem('token');
        token = null;
    }

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
    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await authService.authenticate(username, password)
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        const {pending, fulfilled, rejected} = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const token = action.payload;
                state.token = token;

                // store token object in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(token));

                // get return url from location state or default to home page
                const {from} = history.location.state || {from: {pathname: '/'}};
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
