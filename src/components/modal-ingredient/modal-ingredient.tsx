import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

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

  return (
    <Modal onClose={handleClose} title="Детали ингредиента">
      <IngredientDetails currentIngredient={currentIngredient} />
    </Modal>
  );
};
