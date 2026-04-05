import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '@services/auth/api';
import { isTokenExists } from '@utils/tokens';

import { setIsAuthChecked } from './reduser';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        await dispatch(
          authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
