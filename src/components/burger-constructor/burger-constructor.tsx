import { burgerConstructor } from '@/utils/burger-constructor';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

export const BurgerConstructor: React.FC<TBurgerConstructorProps> = ({
  // ingredients,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = useCallback((): void => {
    setShowModal((state) => !state);
  }, []);

  return (
    <section className={styles.burger_constructor}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className={clsx(styles.ingredient_list, 'custom-scroll pl-4 pr-4')}>
            {burgerConstructor.map((item, indx) => {
              return (
                <li key={item.id} className={styles.ingredient_item}>
                  <div className={styles.drag_button}>
                    {indx !== 0 && indx !== burgerConstructor.length - 1 && (
                      <DragIcon type="primary" />
                    )}
                  </div>
                  <ConstructorElement
                    text={item.text}
                    thumbnail={item.thumbnail}
                    price={item.price}
                    type={item.type}
                    isLocked={item.isLocked}
                  />
                </li>
              );
            })}
          </ul>
          <div className={clsx('pt-10', styles.button_block)}>
            <div className="text text_type_digits-medium">610</div>
            <CurrencyIcon type={'primary'} className="mr-10 ml-2" />
            <Button htmlType="button" onClick={handleClick}>
              Оформить заказ
            </Button>
            {showModal && (
              <Modal onClose={handleClick}>
                <OrderDetails onClose={handleClick} />
              </Modal>
            )}
          </div>
        </>
      )}
    </section>
  );
};
