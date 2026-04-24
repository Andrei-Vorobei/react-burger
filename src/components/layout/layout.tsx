import { Outlet } from 'react-router';

import { AppHeader } from '@components/app-header/app-header';

import styles from './layout.module.css';

export const Layout: React.FC = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      {<Outlet />}
    </div>
  );
};
