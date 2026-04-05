import { useFormWithValidation } from '@/hooks';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router';

import { ProfileInput } from '@components/UI/profile-input/profile-input';
import { authApi, useEditeProfileMutation, useLogoutMutation } from '@services/auth/api';
import { selectUser } from '@services/auth/reduser';

import styles from './profile-page.module.css';

type TUser = {
  name: string;
  email: string;
};

const initEditingState = {
  name: false,
  email: false,
  password: false,
};

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const matches = useMatch('/profile');
  const [editProfile, { isLoading }] = useEditeProfileMutation();
  const [logout] = useLogoutMutation();
  const user = useSelector(selectUser);

  const [userData] = useState<TUser | null>(user);
  const [isEditing, setIsEditing] = useState(initEditingState);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(
    {
      name: userData?.name ?? '',
      email: userData?.email ?? '',
      password: '',
    },
    true
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void editProfile(values);
  };

  const isChange = useMemo(() => {
    return (
      values.name !== userData?.name ||
      values.email !== userData?.email ||
      values.password !== ''
    );
  }, [values, userData]);

  const handleLogout = (): void => {
    void logout({});
    resetForm();
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ProfileInput
            placeholder="Имя"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            editing={isEditing.name}
            handleIconClick={() =>
              setIsEditing({ ...initEditingState, name: !isEditing.name })
            }
            onBlur={() => setIsEditing({ ...initEditingState })}
          />
          <ProfileInput
            placeholder="Логин"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            editing={isEditing.email}
            handleIconClick={() =>
              setIsEditing({ ...initEditingState, email: !isEditing.email })
            }
            onBlur={() => setIsEditing({ ...initEditingState })}
          />
          <ProfileInput
            placeholder="Пароль"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            editing={isEditing.password}
            handleIconClick={() =>
              setIsEditing({ ...initEditingState, password: !isEditing.password })
            }
            onBlur={() => setIsEditing({ ...initEditingState })}
          />
          {isChange && (
            <div className={clsx(styles.buttons)}>
              <Button htmlType="button" type="secondary" onClick={() => resetForm()}>
                Отмена
              </Button>
              <Button htmlType="submit" disabled={!isValid}>
                Сохранить
              </Button>
            </div>
          )}
          {isLoading && (
            <div className={clsx(styles.preloader)}>
              <Preloader />
            </div>
          )}
        </form>
        <div className={clsx(styles.links)}>
          <Link
            className={clsx(styles.link, 'text text_type_main-medium', {
              ['text_color_inactive']: !matches,
            })}
            to="/profile"
          >
            Профиль
          </Link>
          <Link
            className={clsx(
              styles.link,
              'text text_type_main-medium text_color_inactive'
            )}
            to="/profile/orders"
          >
            История заказов
          </Link>
          <div
            className={clsx(
              styles.link,
              'text text_type_main-medium text_color_inactive'
            )}
            onClick={handleLogout}
          >
            Выход
          </div>
          <div className="text text_type_main-default text_color_inactive pt-20">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
      </div>
    </div>
  );
};
