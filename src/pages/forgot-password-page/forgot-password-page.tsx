import { UIInput } from '@/components/UI/ui-input/ui-input';
import { useFormWithValidation } from '@/hooks';
import { usePasswordForgotMutation } from '@/services/auth/api';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordForgot, { isLoading }] = usePasswordForgotMutation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void passwordForgot(values).then((result) => {
      if (result.data?.success === true) {
        void navigate('/reset-password', { state: { from: '/forgot-password' } });
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UIInput
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Button htmlType="submit" disabled={!isValid}>
          Восстановить
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
