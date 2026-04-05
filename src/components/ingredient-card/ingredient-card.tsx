import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  counts: Record<string, number>;
};

export const IngredientCard: React.FC<TIngredientCardProps> = ({
  ingredient,
  counts,
}) => {
  const location = useLocation();

  const ingrdientType = useMemo(() => {
    if (ingredient.type === 'bun') {
      return 'bun';
    }
    if (ingredient.type === 'sauce' || ingredient.type === 'main') {
      return 'main';
    }

    return '';
  }, [ingredient]);

  const [{ isDragging }, dragRef] = useDrag({
    type: ingrdientType,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Link to={`/ingredients/${ingredient._id}`} state={{ background: location }}>
      <div
        className={clsx(styles.card, { [styles.is_dragging]: isDragging })}
        ref={dragRef as unknown as React.RefObject<HTMLDivElement>}
      >
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
        {counts[ingredient._id] && <Counter count={counts[ingredient._id]} />}
      </div>
    </Link>
  );
};
