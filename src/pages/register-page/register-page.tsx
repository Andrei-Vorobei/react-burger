import { UIInput } from '@/components/UI/ui-input/ui-input';
import { useFormWithValidation } from '@/hooks';
import { useRegisterMutation } from '@/services/auth/api';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link } from 'react-router';

import styles from './register-page.module.css';

export const RegisterPage: React.FC = () => {
  const [register] = useRegisterMutation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void register(values);
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UIInput
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <div className={clsx(styles.links, 'text text_type_main-default')}>
        <p>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
