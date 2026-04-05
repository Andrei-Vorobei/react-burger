import { UIInput } from '@/components/UI/ui-input/ui-input';
import { useFormWithValidation } from '@/hooks';
import { useLoginMutation } from '@/services/auth/api';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link } from 'react-router';

import styles from './login-page.module.css';

export const LoginPage: React.FC = () => {
  const [login] = useLoginMutation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void login(values);
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
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
