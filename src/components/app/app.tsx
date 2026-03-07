import { getIngredientsURL } from '@/utils/constants';
import axios, { isCancel } from 'axios';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    axios
      .get(getIngredientsURL, {
        signal: controller.signal,
      })
      .then((response) => {
        setIngredients((response?.data?.data ?? []) as TIngredient[]);
      })
      .catch((err) => {
        if (!isCancel(err)) {
          console.error(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (): void => {
      controller.abort();
    };
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={clsx(styles.title, 'text text_type_main-large mt-10 mb-5 pl-5')}>
        Соберите бургер
      </h1>
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} isLoading={isLoading} />
        <BurgerConstructor ingredients={ingredients} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
