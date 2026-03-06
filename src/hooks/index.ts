import { useCallback, useMemo, useState } from 'react';

type TuseTab = {
  ingredientTitle: string;
  tabValue: string;
  tabHandler: (value: string) => void;
};

type TuseModal = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useTab = (initTab: string): TuseTab => {
  const [tabValue, setTabvalue] = useState(initTab);

  const tabHandler = useCallback((value: string): void => {
    setTabvalue(value);
  }, []);

  const ingredientTitle = useMemo(() => {
    switch (tabValue) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинки';
      case 'sauce':
        return 'Соусы';
      default:
        return '';
    }
  }, [tabValue]);

  return {
    ingredientTitle,
    tabValue,
    tabHandler,
  };
};

export const useModal = (initState: boolean): TuseModal => {
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
