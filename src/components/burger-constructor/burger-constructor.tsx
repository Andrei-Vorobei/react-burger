import { useModal } from '@/hooks';
import {
  setOrderNumber,
  clearConstructor,
  setBurgerName,
} from '@/services/ingredients/actions';
import { usePostOrderMutation } from '@/services/ingredients/api';
import {
  getBurgerConstructor,
  getOrderPrice,
  getOrderList,
  getOrderNumber,
  getBurgerName,
} from '@/services/ingredients/reduser';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientContainer } from '../ingredient-container/ingredient-container';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const burgerConstructor = useSelector(getBurgerConstructor);
  const orderPrice = useSelector(getOrderPrice);
  const orderList = useSelector(getOrderList);
  const orderNumber = useSelector(getOrderNumber);
  const burgerName = useSelector(getBurgerName);
  const [postOrder] = usePostOrderMutation();
  const postOrderHandler = (): void => {
    if (!burgerConstructor.bun) return;
    postOrder({ ingredients: orderList })
      .then(({ data }) => {
        const orderNumber = data?.order.number;
        const burgerName = data?.name ?? '';
        dispatch(setOrderNumber(orderNumber));
        dispatch(setBurgerName(burgerName));
        openModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeOrderModal = (): void => {
    closeModal();
    dispatch(clearConstructor());
  };

  return (
    <section className={styles.burger_constructor}>
      <div>
        <IngredientContainer
          ingredient={burgerConstructor.bun}
          position="top"
          isLocked
        />
        {!burgerConstructor.ingredients.length ? (
          <IngredientContainer />
        ) : (
          <ul className={clsx(styles.ingredient_list, 'custom-scroll')}>
            {burgerConstructor.ingredients.map((item) => {
              return (
                <li key={item.id} className={styles.ingredient_item}>
                  <IngredientContainer ingredient={item} />
                </li>
              );
            })}
          </ul>
        )}
        <IngredientContainer
          ingredient={burgerConstructor.bun}
          position="bottom"
          isLocked
        />
        <div className={clsx('pt-10', styles.button_block)}>
          <div className="text text_type_digits-medium">{orderPrice}</div>
          <CurrencyIcon type={'primary'} className="mr-10 ml-2" />
          <Button htmlType="button" onClick={postOrderHandler}>
            Оформить заказ
          </Button>
          {isModalOpen && (
            <Modal onClose={closeOrderModal} title={burgerName}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};
