import { UIInput } from '@/components/UI/ui-input/ui-input';
import { useFormWithValidation } from '@/hooks';
import { usePasswordResetMutation } from '@/services/auth/api';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordReset, { isLoading }] = usePasswordResetMutation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    password: '',
    code: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void passwordReset(values).then((result) => {
      if (result.data?.success === true) {
        void navigate('/login');
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UIInput
          placeholder="Введите новый пароль"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <UIInput
          placeholder="Введите код из письма"
          name="code"
          value={values.code}
          onChange={handleChange}
          error={errors.code}
        />
        <Button htmlType="submit" disabled={!isValid}>
          Сохранить
        </Button>
        {isLoading && (
          <div className={clsx(styles.preloader)}>
            <Preloader />
          </div>
        )}
      </form>
      <div className={clsx(styles.links, 'text text_type_main-default')}>
        <p>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
