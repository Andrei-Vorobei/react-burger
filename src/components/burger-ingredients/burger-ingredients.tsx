import { useModal } from '@/hooks';
import { ingredientModal } from '@/services/ingredients/actions';
import { getIngredient, getCounts } from '@/services/ingredients/reduser';
import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];

  isLoading: boolean;
};

export const BurgerIngredients: React.FC<TBurgerIngredientsProps> = ({
  ingredients,
  isLoading,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [tabValue, setTabvalue] = useState('bun');
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const currentIngredient = useSelector(getIngredient);
  const counts = useSelector(getCounts);
  const dispatch = useDispatch();
  const onClick = (ingredient: TIngredient): void => {
    dispatch(ingredientModal(ingredient));
    openModal();
  };

  const onClose = (): void => {
    closeModal();
    dispatch(ingredientModal(null));
  };

  const bun = useMemo(() => {
    return ingredients?.filter((item) => item.type === 'bun');
  }, [ingredients]);

  const main = useMemo(() => {
    return ingredients?.filter((item) => item.type === 'main');
  }, [ingredients]);

  const sauce = useMemo(() => {
    return ingredients?.filter((item) => item.type === 'sauce');
  }, [ingredients]);

  const tabHandler = (elementRef: HTMLDivElement | null): void => {
    elementRef?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollHandler = useCallback(
    (event: React.UIEvent<HTMLElement>): void => {
      const target = event.currentTarget;
      const targetOffset = target.getBoundingClientRect().top;
      const bunOffset = bunRef.current?.getBoundingClientRect().top ?? 0;
      const mainOffset = mainRef.current?.getBoundingClientRect().top ?? 0;
      const sauceOffset = sauceRef.current?.getBoundingClientRect().top ?? 0;

      const bunOffsetAbs = Math.abs(targetOffset - bunOffset);
      const mainOffsetAbs = Math.abs(targetOffset - mainOffset);
      const sauceOffsetAbs = Math.abs(targetOffset - sauceOffset);

      if (bunOffsetAbs < mainOffsetAbs && bunOffsetAbs < sauceOffsetAbs) {
        setTabvalue('bun');
      } else if (mainOffsetAbs < bunOffsetAbs && mainOffsetAbs < sauceOffsetAbs) {
        setTabvalue('main');
      } else {
        setTabvalue('sauce');
      }
    },
    [bunRef, mainRef, sauceRef]
  );

  return (
    <section className={styles.burger_ingredients}>
      {isModalOpen && (
        <Modal onClose={onClose} title="Детали ингредиента">
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={tabValue === 'bun'}
            onClick={() => {
              /* TODO */
              tabHandler(bunRef.current);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={tabValue === 'sauce'}
            onClick={() => {
              /* TODO */
              tabHandler(sauceRef.current);
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={tabValue === 'main'}
            onClick={() => {
              /* TODO */
              tabHandler(mainRef.current);
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      {isLoading ? (
        <Preloader />
      ) : (
        <article
          className={clsx('custom-scroll mt-10', styles.ingredients_list)}
          onScroll={scrollHandler}
        >
          <div className="text text_type_main-medium" ref={bunRef}>
            Булки
          </div>
          <ul className={clsx('pt-6 pb-10 pl-4 pr-4', styles.ingredients_cards)}>
            {bun.map((item) => {
              return (
                <li key={item._id}>
                  <IngredientCard
                    ingredient={item}
                    onClick={() => onClick(item)}
                    counts={counts}
                  />
                </li>
              );
            })}
          </ul>
          <div className="text text_type_main-medium" ref={sauceRef}>
            Соусы
          </div>
          <ul className={clsx('pt-6 pb-10 pl-4 pr-4', styles.ingredients_cards)}>
            {sauce.map((item) => {
              return (
                <li key={item._id}>
                  <IngredientCard
                    ingredient={item}
                    onClick={() => onClick(item)}
                    counts={counts}
                  />
                </li>
              );
            })}
          </ul>
          <div className="text text_type_main-medium" ref={mainRef}>
            Начинки
          </div>
          <ul className={clsx('pt-6 pb-10 pl-4 pr-4', styles.ingredients_cards)}>
            {main.map((item) => {
              return (
                <li key={item._id}>
                  <IngredientCard
                    ingredient={item}
                    onClick={() => onClick(item)}
                    counts={counts}
                  />
                </li>
              );
            })}
          </ul>
        </article>
      )}
    </section>
  );
};
