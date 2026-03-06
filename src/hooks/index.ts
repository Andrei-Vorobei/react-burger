import { useCallback, useMemo, useState } from 'react';

type TuseTab = {
  ingredientTitle: string;
  tabValue: string;
  tabHandler: (value: string) => void;
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
