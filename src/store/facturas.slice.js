import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { facturasService } from "services";

// create slice

const name = 'facturas';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const facturasActions = { ...slice.actions, ...extraActions };
export const facturasReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        items: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await facturasService.getAll()
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.items = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.items = action.payload;
            },
            [rejected]: (state, action) => {
                state.items = { error: action.error };
            }
        };
    }
}
