import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { facturasReducer } from './facturas.slice';

export * from './auth.slice';
export * from './facturas.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        facturas: facturasReducer
    },
});