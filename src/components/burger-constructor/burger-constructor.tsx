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
} from '@/services/ingredients/reduser';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientContainer } from '@components/ingredient-container/ingredient-container';
import { ModalLogin } from '@components/modal-login/modal-login';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { selectIsAuthChecked, selectUser } from '@services/auth/reduser';

import styles from './burger-constructor.module.css';

const initModalState = { title: '', content: '' };

export const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [modalState, setModalState] = useState(initModalState);
  const burgerConstructor = useSelector(getBurgerConstructor);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const orderPrice = useSelector(getOrderPrice);
  const orderList = useSelector(getOrderList);
  const orderNumber = useSelector(getOrderNumber);
  const [postOrder] = usePostOrderMutation();

  const postOrderHandler = (): void => {
    if (!user && isAuthChecked) {
      setModalState({ title: 'Авторизуйтесь', content: 'auth' });
      openModal();
      return;
    }

    postOrder({ ingredients: orderList })
      .then(({ data }) => {
        const orderNumber = data?.order.number;
        const burgerName = data?.name ?? '';
        dispatch(setOrderNumber(orderNumber));
        dispatch(setBurgerName(burgerName));
        setModalState({ title: burgerName, content: 'order' });
        openModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onCloseLoginModal = (): void => {
    closeModal();
  };

  const closeOrderModal = (): void => {
    closeModal();
    if (modalState.content === 'order') {
      setModalState(initModalState);
      dispatch(clearConstructor());
    }
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
          <Button
            htmlType="button"
            onClick={postOrderHandler}
            disabled={!burgerConstructor.bun}
          >
            Оформить заказ
          </Button>
          {isModalOpen && (
            <Modal onClose={closeOrderModal} title={modalState.title}>
              {modalState.content === 'order' && (
                <OrderDetails orderNumber={orderNumber} />
              )}
              {modalState.content === 'auth' && (
                <ModalLogin onClose={onCloseLoginModal} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};
