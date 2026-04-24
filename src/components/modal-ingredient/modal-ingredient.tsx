import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal-ingredient.module.css';

export const ModalIngredient: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: { data: ingredients = [] } = { data: [] } } = useGetIngredientsQuery('');
  const currentIngredient = ingredients.find((ingredient) => ingredient._id === id);

  const handleClose = (): void => {
    void navigate(-1);
  };

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', escapeHandler);

    return (): void => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={handleClose} />
      <div className={styles.modal}>
        <CloseIcon
          type="primary"
          onClick={() => handleClose()}
          className={styles.close_icon}
        />
        <div className={styles.modal_title}>
          <div className={clsx(styles.title, 'text text_type_main-large pt-1 pb-1')}>
            Детали ингредиента
          </div>
        </div>
        <IngredientDetails currentIngredient={currentIngredient} />
      </div>
    </>,
    document.getElementById('modal')!
  );
};
