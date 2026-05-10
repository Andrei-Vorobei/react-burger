import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { memo } from 'react';

import styles from './modal-loader.module.css';

export const ModalLoader: React.FC = memo(() => {
  return (
    <div className={clsx(styles.centered)}>
      <Preloader />
    </div>
  );
});

ModalLoader.displayName = 'ModalLoader';
