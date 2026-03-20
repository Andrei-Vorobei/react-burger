import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {
  ingredientModal,
  setBuns,
  setIngredient,
  replaceIngredient,
  removeIngredient,
  setOrderNumber,
  clearConstructor,
  setBurgerName,
} from './actions';

import type { TIngredient } from '@/utils/types';

type TIngredientState = {
  ingredient: TIngredient | null;
  burgerConstructor: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  orderNumber: number | null | undefined;
  burgerName: string;
};

const initialState: TIngredientState = {
  ingredient: null,
  burgerConstructor: {
    bun: null,
    ingredients: [],
  },
  orderNumber: null,
  burgerName: '',
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    getIngredient: (state) => state.ingredient,
    getBurgerConstructor: (state) => state.burgerConstructor,
    getOrderNumber: (state) => state.orderNumber,
    getBurgerName: (state) => state.burgerName,
    getOrderPrice: createSelector(
      (state: TIngredientState) => state.burgerConstructor,
      (burgerConstructor) => {
        return (
          (burgerConstructor.bun?.price ?? 0) * 2 +
          burgerConstructor.ingredients.reduce(
            (sum, ingredient) => sum + (ingredient.price || 0),
            0
          )
        );
      }
    ),
    getCounts: createSelector(
      (state: TIngredientState) => state.burgerConstructor,
      (burgerConstructor) => {
        const counts: Record<string, number> = {};
        if (burgerConstructor.bun) {
          counts[burgerConstructor.bun._id] = 2;
        }
        burgerConstructor.ingredients.forEach((ingredient) => {
          counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
        });
        return counts;
      }
    ),
    getOrderList: createSelector(
      (state: TIngredientState) => state.burgerConstructor,
      (burgerConstructor) => {
        const orderList: string[] = [];
        burgerConstructor.ingredients.forEach((ingredient) => {
          orderList.push(ingredient._id);
        });
        if (burgerConstructor.bun) {
          orderList.push(burgerConstructor.bun._id);
          orderList.unshift(burgerConstructor.bun._id);
        }
        return orderList;
      }
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientModal, (state, action) => {
        state.ingredient = action.payload;
      })
      .addCase(setBuns, (state, action) => {
        state.burgerConstructor.bun = action.payload;
      })
      .addCase(setIngredient, (state, action) => {
        if (action.payload.dropElement) {
          const dropElement = { ...action.payload.dropElement };
          const draggedElement = { ...action.payload.draggedElement };
          const injectedIndx = state.burgerConstructor.ingredients.findIndex(
            (item) => item.id === dropElement?.id
          );
          state.burgerConstructor.ingredients.splice(injectedIndx, 0, draggedElement);
        } else {
          state.burgerConstructor.ingredients.push(action.payload.draggedElement);
        }
      })
      .addCase(replaceIngredient, (state, action) => {
        const dropElement = { ...action.payload.dropElement };
        const draggedElement = { ...action.payload.draggedElement };
        const injectedIndx = state.burgerConstructor.ingredients.findIndex(
          (item) => item.id === dropElement?.id
        );
        const toDeleteIndx = state.burgerConstructor.ingredients.findIndex(
          (item, indx) => item.id === draggedElement?.id && indx !== injectedIndx
        );
        state.burgerConstructor.ingredients.splice(toDeleteIndx, 1);
        state.burgerConstructor.ingredients.splice(injectedIndx, 0, draggedElement);
      })
      .addCase(removeIngredient, (state, action) => {
        const id = action.payload;
        const toDeleteIndx = state.burgerConstructor.ingredients.findIndex(
          (item) => item.id === id
        );
        state.burgerConstructor.ingredients.splice(toDeleteIndx, 1);
      })
      .addCase(setOrderNumber, (state, action) => {
        state.orderNumber = action.payload;
      })
      .addCase(clearConstructor, (state) => {
        state.burgerConstructor.bun = null;
        state.burgerConstructor.ingredients = [];
      })
      .addCase(setBurgerName, (state, action) => {
        state.burgerName = action.payload;
      });
  },
});

export const {
  getIngredient,
  getBurgerConstructor,
  getOrderPrice,
  getCounts,
  getOrderList,
  getOrderNumber,
  getBurgerName,
} = ingredientSlice.selectors;
