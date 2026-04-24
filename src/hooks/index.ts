import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { validators } from '@utils/validators';

import type { AppDispatch, RootState } from '@/services/store';

type TypeModal = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (initState: boolean): TypeModal => {
  const [isModalOpen, setIsModalOpen] = useState(initState);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export type TFormValues = Record<string, string>;

type TFormErrors = Record<string, { value: boolean; message: string }>;

type TuseFormWithValidation = {
  values: TFormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: TFormErrors;
  isValid: boolean;
  resetForm: () => void;
};

export function useFormWithValidation(
  initialValues = {},
  passNullable = false
): TuseFormWithValidation {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initErrors(initialValues));
  const [isValid, setIsValid] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const input = event.target;
    const value = input.value;
    const name = input.name;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    const newErrors = {
      ...errors,
      [name]: {
        value: validators[name as keyof typeof validators]?.validator(value) ?? false,
        message: validators[name as keyof typeof validators]?.message ?? '',
      },
    };

    setErrors(newErrors);

    setIsValid(validateForm(newValues, newErrors, passNullable));
  }

  const resetForm = (): void => {
    setValues(initialValues);
    setErrors(initErrors(initialValues));
    setIsValid(false);
  };

  return { values, handleChange, errors, isValid, resetForm };
}

function initErrors(formValues: TFormValues): TFormErrors {
  return Object.keys(formValues).reduce((errors: TFormErrors, fieldName) => {
    errors[fieldName] = { value: false, message: '' };
    return errors;
  }, {});
}

function validateForm(
  values: TFormValues,
  errors: TFormErrors,
  passNullable: boolean
): boolean {
  return (
    !Object.values(errors).some((x) => x.value) &&
    Object.entries(values).every(([key, value]) => {
      if (key === 'password' && value === '' && passNullable) {
        return true;
      }
      return !!value;
    })
  );
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
