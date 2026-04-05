import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { clsx } from 'clsx';
import { useParams } from 'react-router';

import styles from './ingredients-details-page.module.css';

export const IngredientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: { data: ingredients = [] } = { data: [] } } = useGetIngredientsQuery('');

  const currentIngredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <div className={styles.centered}>
        <img src={currentIngredient?.image_large} alt={currentIngredient?.name} />
      </div>
      <div className={clsx('text text_type_main-medium mt-4 mb-8', styles.centered)}>
        {currentIngredient?.name}
      </div>
      <div className={styles.nutrients}>
        <div className={styles.nutrients_item}>
          <div
            className={clsx(
              'text text_type_main-default text_color_inactive mb-2',
              styles.text_align_center
            )}
          >
            Калории,ккал
          </div>
          <div
            className={clsx(
              'text text_type_digits-default text_color_inactive',
              styles.text_align_center
            )}
          >
            {currentIngredient?.calories}
          </div>
        </div>
        <div className={styles.nutrients_item}>
          <div
            className={clsx(
              'text text_type_main-default text_color_inactive mb-2',
              styles.text_align_center
            )}
          >
            Белки, г
          </div>
          <div
            className={clsx(
              'text text_type_digits-default text_color_inactive',
              styles.text_align_center
            )}
          >
            {currentIngredient?.proteins}
          </div>
        </div>
        <div className={styles.nutrients_item}>
          <div
            className={clsx(
              'text text_type_main-default text_color_inactive mb-2',
              styles.text_align_center
            )}
          >
            Жиры, г
          </div>
          <div
            className={clsx(
              'text text_type_digits-default text_color_inactive',
              styles.text_align_center
            )}
          >
            {currentIngredient?.fat}
          </div>
        </div>
        <div className={styles.nutrients_item}>
          <div
            className={clsx(
              'text text_type_main-default text_color_inactive mb-2',
              styles.text_align_center
            )}
          >
            Углеводы, г
          </div>
          <div
            className={clsx(
              'text text_type_digits-default text_color_inactive',
              styles.text_align_center
            )}
          >
            {currentIngredient?.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
};
