import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModal = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<TModal> = ({ children, onClose }) => {
  const escapeHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escapeHandler);

    return (): void => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById('modal')!
  );
};
