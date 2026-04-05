import { UIInput } from '@/components/UI/ui-input/ui-input';
import { useFormWithValidation } from '@/hooks';
import { useLoginMutation } from '@/services/auth/api';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link } from 'react-router';

import styles from './modal-login.module.css';

type TModalLoginProps = {
  onClose: () => void;
};

export const ModalLogin: React.FC<TModalLoginProps> = ({ onClose }) => {
  const [login] = useLoginMutation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void login(values).then(() => {
      onClose();
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UIInput
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <UIInput
          placeholder="Пароль"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button htmlType="submit" disabled={!isValid}>
          Войти
        </Button>
      </form>
      <div className={clsx(styles.links, 'text text_type_main-default')}>
        <p>
          Вы — новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p>
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
