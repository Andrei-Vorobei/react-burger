import {
  EditIcon,
  CloseIcon,
  ShowIcon,
  HideIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { PASSWORD_TYPE, TEXT_TYPE } from '@utils/constants';

import styles from './profile-input.module.css';

type TProfileInputProps = {
  type?: string;
  inputClass?: string;
  labelClass?: string;
  containerClass?: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: { value: boolean; message: string };
  editing?: boolean;
  handleIconClick?: () => void;
  onBlur?: () => void;
};

export const ProfileInput: React.FC<TProfileInputProps> = ({
  type = 'text',
  inputClass = '',
  containerClass = '',
  labelClass = '',
  error = { value: false, message: '' },
  value = '',
  placeholder,
  editing,
  onBlur,
  handleIconClick,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputType, setInputType] = useState(type);

  const handleHideIconClick = (): void => {
    if (inputType === PASSWORD_TYPE) {
      setInputType(TEXT_TYPE);
    } else {
      setInputType(PASSWORD_TYPE);
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }

    return (): void => {
      inputRef.current?.blur();
    };
  }, [editing]);

  return (
    <div>
      <div
        className={clsx(styles.container, containerClass, {
          [styles.error]: error.value,
          [styles.border_editing]: editing,
        })}
      >
        <div
          className={clsx(styles.input_wrapper, { [styles.cursor_pointer]: !editing })}
        >
          <label
            htmlFor={placeholder}
            className={clsx(
              styles.label,
              labelClass,
              'text text_type_main-default text_color_inactive'
            )}
          >
            {placeholder}
          </label>
          <input
            value={value}
            onBlur={onBlur}
            disabled={!editing}
            ref={inputRef}
            id={placeholder}
            className={clsx(
              styles.input,
              inputClass,
              'text text_type_main-default text_color_inactive'
            )}
            placeholder={type === 'password' ? '*******' : ''}
            type={inputType}
            {...props}
          />
        </div>
        <div className={clsx(styles.icon, 'mr-2 ml-2')} onClick={handleHideIconClick}>
          {type === PASSWORD_TYPE &&
            value &&
            (inputType === PASSWORD_TYPE ? (
              <HideIcon type="primary" />
            ) : (
              <ShowIcon type="primary" />
            ))}
        </div>
        <div className={styles.icon} onClick={handleIconClick}>
          {editing ? <CloseIcon type="primary" /> : <EditIcon type="primary" />}
        </div>
      </div>
      {error.value && <span className={styles.error_message}>{error.message}</span>}
    </div>
  );
};
