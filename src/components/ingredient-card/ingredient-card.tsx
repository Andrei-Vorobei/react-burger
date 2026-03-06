import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const IngredientCard: React.FC<TIngredientCardProps> = ({
  ingredient,
  onClick,
}) => {
  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <div className={clsx(styles.centered, 'pl-4 pr-4')}>
          <img
            src={ingredient.image_large}
            alt={ingredient.name}
            width={240}
            height={120}
          />
        </div>
        <div className={clsx(styles.centered, 'pt-1 pb-1')}>
          <div className="text text_type_digits-default pr-2">{ingredient.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.centered}>{ingredient.name}</div>
        <Counter count={1} />
      </div>
    </>
  );
};
