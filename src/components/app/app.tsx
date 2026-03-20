import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { clsx } from 'clsx';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App: React.FC = () => {
  const {
    data: { data: ingredients = [] } = { data: [] },
    isLoading,
    isError,
  } = useGetIngredientsQuery('', {
    // pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });

  if (!isLoading && isError) {
    return <h2>{`Ошибка: ${isError}`}</h2>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={clsx(styles.title, 'text text_type_main-large mt-10 mb-5 pl-5')}>
        Соберите бургер
      </h1>
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} isLoading={isLoading} />
        <BurgerConstructor isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
