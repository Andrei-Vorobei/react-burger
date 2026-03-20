import { createAction, nanoid } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TReplaceIngredient = {
  dropElement?: TIngredient | null | undefined;
  draggedElement: TIngredient;
};

export const ingredientModal = createAction<TIngredient | null>('ingredients/modal');
export const setBuns = createAction<TIngredient>('ingredients/setBuns');
export const setIngredient = createAction(
  'ingredients/setIngredient',
  (payload: TReplaceIngredient) => {
    const newPayload = {
      ...payload,
    };
    const draggedElement = { ...newPayload.draggedElement };
    draggedElement.id ??= nanoid();
    newPayload.draggedElement = draggedElement;
    return {
      payload: newPayload,
    };
  }
);

export const replaceIngredient = createAction<TReplaceIngredient>(
  'ingredients/replaceIngredient'
);
export const removeIngredient = createAction<string>('ingredients/removeIngredient');
export const setOrderNumber = createAction<number | undefined>(
  'ingredients/setOrderNumber'
);
export const clearConstructor = createAction('ingredients/clearConstructor');
export const setBurgerName = createAction<string>('ingredients/setBurgerName');
