import { useAppDispatch } from '@/hooks';
import { Home } from '@/pages/home/home';
import { IngredientDetailsPage } from '@/pages/ingredients-details-page/ingredients-details-page';
import { checkUserAuth } from '@/services/auth/actions';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';

import { ProtectedRoute } from '@components/protected-route/protected-route';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page';
import { LoginPage } from '@pages/login-page/login-page';
import { NotFoundPage } from '@pages/not-found-page/not-found-page';
import { ProfileOrdersPage } from '@pages/profile-orders-page/profile-orders-page';
import { ProfilePage } from '@pages/profile-page/profile-page';
import { RegisterPage } from '@pages/register-page/register-page';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page';

import { Layout } from '../layout/layout';
import { ModalIngredient } from '../modal-ingredient/modal-ingredient';

import type { UnknownAction } from '@reduxjs/toolkit';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth() as unknown as UnknownAction);
  }, [dispatch]);

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ingredients/:id" element={<IngredientDetailsPage />} />
          <Route
            path="login"
            element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="forgot-password"
            element={<ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="reset-password"
            element={<ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute component={<ProfilePage />} />}
          />
          <Route
            path="profile/orders"
            element={<ProtectedRoute component={<ProfileOrdersPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalIngredient />} />
        </Routes>
      )}
    </>
  );
};
