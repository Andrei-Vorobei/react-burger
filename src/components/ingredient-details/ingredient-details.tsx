import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TModal = {
  onClose: () => void;
  ingredient: TIngredient;
};

export const IngredientDetails: React.FC<TModal> = ({ onClose, ingredient }) => {
  return (
    <div className="pt-10 pl-10 pr-10 pb-15">
      <div className={styles.modal_title}>
        <div className="text text_type_main-large">Детали ингредиента</div>
        <CloseIcon
          type="primary"
          onClick={() => onClose()}
          className={styles.close_icon}
        />
      </div>
      <div className={styles.centered}>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <div className={clsx('text text_type_main-medium mt-4 mb-8', styles.centered)}>
        {ingredient.name}
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
            {ingredient.calories}
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
            {ingredient.proteins}
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
            {ingredient.fat}
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
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
};
