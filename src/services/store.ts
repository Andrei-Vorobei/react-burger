import { configureStore as createStore, combineSlices } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from './auth/api';
import { userSlice } from './auth/reduser';
import { ingredientsApi } from './ingredients/api';
import { ingredientSlice } from './ingredients/reduser';

const rootReducer = combineSlices(ingredientSlice, ingredientsApi, userSlice, authApi);

export const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
