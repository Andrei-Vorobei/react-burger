import { Link } from 'react-router';

import { pageNotFoundImage } from '@utils/constants';

import styles from './not-found-page.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Страница не найдена</h1>
      <img className={styles.img} src={pageNotFoundImage} alt="Страница не найдена" />
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};
