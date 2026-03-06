import { useModal, useTab } from '@/hooks';
import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';

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
  const { ingredientTitle, tabValue, tabHandler } = useTab('bun');
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [currentIngredient, setCurrentIngredient] = useState<TIngredient | null>(null);

  const onClick = (ingredient: TIngredient): void => {
    setCurrentIngredient(ingredient);
    openModal();
  };

  const onClose = (): void => {
    closeModal();
    setCurrentIngredient(null);
  };

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
              tabHandler('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={tabValue === 'main'}
            onClick={() => {
              /* TODO */
              tabHandler('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={tabValue === 'sauce'}
            onClick={() => {
              /* TODO */
              tabHandler('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      {isLoading ? (
        <Preloader />
      ) : (
        <article className={clsx('custom-scroll mt-10', styles.ingredients_list)}>
          <div className="text text_type_main-medium">{ingredientTitle}</div>
          <ul className={clsx('pt-6 pb-10 pl-4 pr-4', styles.ingredients_cards)}>
            {ingredients.map((item) => {
              if (item.type === tabValue) {
                return (
                  <li key={item._id}>
                    <IngredientCard ingredient={item} onClick={() => onClick(item)} />
                  </li>
                );
              }
            })}
          </ul>
        </article>
      )}
    </section>
  );
};
