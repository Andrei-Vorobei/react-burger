import { ShowIcon, HideIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useState } from 'react';

import { PASSWORD_TYPE, TEXT_TYPE } from '@utils/constants';

import styles from './ui-input.module.css';

type UIInputProps = {
  type?: string;
  inputClass?: string;
  containerClass?: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: { value: boolean; message: string };
};

export const UIInput: React.FC<UIInputProps> = ({
  type = 'text',
  inputClass = '',
  containerClass = '',
  error = { value: false, message: '' },
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const handleIconClick = (): void => {
    if (inputType === PASSWORD_TYPE) {
      setInputType(TEXT_TYPE);
    } else {
      setInputType(PASSWORD_TYPE);
    }
  };

  return (
    <div>
      <div
        className={clsx(styles.container, containerClass, {
          [styles.error]: error.value,
        })}
      >
        <input
          className={clsx(
            styles.input,
            inputClass,
            'text text_type_main-default text_color_inactive'
          )}
          type={inputType}
          {...props}
        />
        {error.value && <span className={styles.error_message}>{error.message}</span>}
        <div className={styles.icon} onClick={handleIconClick}>
          {type === PASSWORD_TYPE &&
            (inputType === PASSWORD_TYPE ? (
              <HideIcon type="primary" />
            ) : (
              <ShowIcon type="primary" />
            ))}
        </div>
      </div>
    </div>
  );
};
