import clsx from 'clsx';
import { Link, useMatch } from 'react-router';

import styles from './profile-links.module.css';

export const ProfileLinks: React.FC = () => {
  const matches = useMatch('profile/orders');

  return (
    <div className={clsx(styles.links)}>
      <Link
        className={clsx(styles.link, 'text text_type_main-medium text_color_inactive')}
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
        className={clsx(styles.link, 'text text_type_main-medium text_color_inactive')}
        to="/logout"
      >
        Выход
      </Link>
      <div className="text text_type_main-default text_color_inactive pt-20">
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};
