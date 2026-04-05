import { clsx } from 'clsx';
import { Link, useMatch } from 'react-router';

import { inDevelopmentImage } from '@utils/constants';

import styles from './profile-orders-page.module.css';

export const ProfileOrdersPage: React.FC = () => {
  const matches = useMatch('profile/orders');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.orders}>
          <h1 className="text text_type_main-medium">Раздел находится в разработке</h1>
          <img className={styles.img} src={inDevelopmentImage} alt="In Development" />
        </div>
        <div className={clsx(styles.links)}>
          <Link
            className={clsx(
              styles.link,
              'text text_type_main-medium text_color_inactive'
            )}
            to="/profile"
          >
            Профиль
          </Link>
          <Link
            className={clsx(styles.link, 'text text_type_main-medium', {
              ['text_color_inactive']: !matches,
            })}
            to="/profile/orders"
          >
            История заказов
          </Link>
          <Link
            className={clsx(
              styles.link,
              'text text_type_main-medium text_color_inactive'
            )}
            to="/logout"
          >
            Выход
          </Link>
          <div className="text text_type_main-default text_color_inactive pt-20">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
      </div>
    </div>
  );
};
