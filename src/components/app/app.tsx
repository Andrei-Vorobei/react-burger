import { clsx } from 'clsx';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={clsx(styles.title, 'text text_type_main-large mt-10 mb-5 pl-5')}>
        Соберите бургер
      </h1>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
