import { clsx } from 'clsx';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TModal = {
  currentIngredient: TIngredient | null;
};

export const IngredientDetails: React.FC<TModal> = ({ currentIngredient }) => {
  return (
    <div>
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
