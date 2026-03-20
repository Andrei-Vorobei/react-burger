import {
  removeIngredient,
  setBuns,
  setIngredient,
  replaceIngredient,
} from '@/services/ingredients/actions';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { EmptyElement } from '../epmtyElement/empty-element';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-container.module.css';

type TIngredientContainerProps = {
  ingredient?: TIngredient | null;
  position?: 'top' | 'bottom' | undefined;
  isLocked?: boolean;
};

export const IngredientContainer: React.FC<TIngredientContainerProps> = ({
  ingredient,
  position,
  isLocked,
}) => {
  const dispatch = useDispatch();
  const ingredientType = useMemo(() => {
    if (position === 'top' || position === 'bottom') {
      return 'bun';
    }
    return 'main';
  }, [position]);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'replaceIngredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, replaceDropRef] = useDrop({
    accept: 'replaceIngredient',
    hover: (draggedElement: TIngredient) => {
      if (draggedElement.id !== ingredient?.id && !position) {
        dispatch(
          replaceIngredient({
            dropElement: ingredient,
            draggedElement: draggedElement,
          })
        );
      }
    },
  });

  const [{ isOverDrop }, dropRef] = useDrop({
    accept: ingredientType,
    drop: (draggedElement: TIngredient) => {
      if (draggedElement.type === 'bun') {
        dispatch(setBuns(draggedElement));
      } else {
        dispatch(setIngredient({ draggedElement, dropElement: ingredient }));
      }
    },
    collect: (monitor) => ({
      isOverDrop: monitor.isOver(),
    }),
  });

  const removeHandler = (id: string | undefined): void => {
    if (id) {
      dispatch(removeIngredient(id));
    }
  };

  return (
    <div
      className={clsx(styles.ingredient_item, 'mr-1', { ['pt-4 pb-4']: !position })}
      ref={replaceDropRef as unknown as React.RefObject<HTMLDivElement>}
    >
      <div
        className={clsx(styles.container, {
          [styles.is_dragging]: isDragging && !position,
          ['mr-4']: position,
        })}
        ref={!position ? (dragRef as unknown as React.RefObject<HTMLDivElement>) : null}
      >
        {ingredient ? (
          <>
            <div className={styles.drag_button}>
              {!position && <DragIcon type="primary" />}
            </div>
            <div
              className={styles.ingredient_container}
              ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
            >
              <ConstructorElement
                extraClass={clsx({ [styles.is_over_replace]: isOverDrop })}
                handleClose={() => removeHandler(ingredient.id)}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient?.price ?? 0}
                type={position}
                isLocked={isLocked}
              />
            </div>
          </>
        ) : (
          <EmptyElement position={position} />
        )}
      </div>
    </div>
  );
};
