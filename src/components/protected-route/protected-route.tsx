import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { selectIsAuthChecked, selectUser } from '@services/auth/reduser';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: {
  onlyUnAuth?: boolean;
  component: React.ReactNode;
}): React.ReactNode => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && !user) {
    if (
      location.pathname === '/reset-password' &&
      location.state?.from !== '/forgot-password'
    ) {
      return <Navigate to="/login" replace />;
    }
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};
