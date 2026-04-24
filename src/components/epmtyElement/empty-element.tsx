import { useAppDispatch } from '@/hooks';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { setBuns, setIngredient } from '@services/ingredients/actions';

import type { TIngredient } from '@/utils/types';

import styles from './empty-element.module.css';

type TType = 'top' | 'bottom' | undefined;

type TEmptyElementProps = {
  position: TType;
};

export const EmptyElement: React.FC<TEmptyElementProps> = ({ position }) => {
  const dispatch = useAppDispatch();
  const ingredientType = useMemo(() => {
    if (position === 'top' || position === 'bottom') {
      return 'bun';
    }
    return 'main';
  }, [position]);

  const [{ isOver }, dropRef] = useDrop({
    accept: ingredientType,
    drop: (draggedElement: TIngredient) => {
      if (draggedElement.type === 'bun') {
        dispatch(setBuns(draggedElement));
      } else {
        dispatch(setIngredient({ draggedElement }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getTitle = (position: string | undefined): string => {
    switch (position) {
      case 'top':
        return 'Выберите булки';
      case 'bottom':
        return 'Выберите булки';
      default:
        return 'Выберите начинку';
    }
  };

  return (
    <>
      <div className={styles.drag_button} />
      <div
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
        className={clsx(styles.empty_element, {
          [styles.top_element]: position === 'top',
          [styles.bottom_element]: position === 'bottom',
          [styles.middle_element]: !position,
          [styles.is_over]: isOver,
        })}
      >
        <p className="text text_type_main-small">{getTitle(position)}</p>
      </div>
    </>
  );
};
