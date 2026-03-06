import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={() => onClose()} />;
};
