import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModal = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export const Modal: React.FC<TModal> = ({ children, onClose, title }) => {
  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escapeHandler);

    return (): void => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <CloseIcon
          type="primary"
          onClick={() => onClose()}
          className={styles.close_icon}
        />
        <div className={styles.modal_title}>
          {title && <div className="text text_type_main-large">{title}</div>}
        </div>
        {children}
      </div>
    </>,
    document.getElementById('modal')!
  );
};
