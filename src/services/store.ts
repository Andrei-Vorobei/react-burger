import { configureStore as createStore, combineSlices } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { ingredientsApi } from './ingredients/api';
import { ingredientSlice } from './ingredients/reduser';

const rootReducer = combineSlices(ingredientSlice, ingredientsApi);

export const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});

setupListeners(store.dispatch);
