import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { useParams } from 'react-router';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import styles from './ingredients-details-page.module.css';

export const IngredientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: { data: ingredients = [] } = { data: [] } } = useGetIngredientsQuery('');

  const currentIngredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails currentIngredient={currentIngredient} />
    </div>
  );
};
