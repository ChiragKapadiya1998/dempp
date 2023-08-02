import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { PASSIONS } from '../../utils/constants';
import {
  GetPassionCategoryFailure,
  GetPassionCategoryRequest,
  GetPassionCategorySuccess,
  State,
  TogglePassions,
  ClearPassionsData,
  ToggleEditPassions,
  UpdatePassionsRequest,
  UpdatePassionsFailure,
  UpdatePassionsSuccess,
  GetRecomendedPassionsRequest,
  GetRecomendedPassionsSuccess,
  GetRecomendedPassionsFailure,
  ToggleRecomendedPassions,
  ToggleSelectPassions,
} from './types';

import { actions as authActions } from '../auth';

const name = PASSIONS;
const initialState: State = {
  loading: false,
  categories: [],
  selectCategories: [],
  recomended: [],
  err: null,
  meta: {
    page: 1,
    pageSize: 5,
    query: '',
  },
  isEditing: false,
};

const getRecomendedPassionsRequest: GetRecomendedPassionsRequest = (state, { payload }) => {
  state.loading = true;
  state.err = null;
  state.meta = { ...state.meta, query: payload.query };
  state.recomended = [];
};

const getRecomendedPassionsSuccess: GetRecomendedPassionsSuccess = (state, { payload }) => {
  state.loading = false;
  state.recomended = payload;
};

const getRecomendedPassionsFailure: GetRecomendedPassionsFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const getPassionCategoryRequest: GetPassionCategoryRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const getPassionCategorySuccess: GetPassionCategorySuccess = (state, { payload }) => {
  state.loading = false;
  state.categories = payload;
};

const getPassionCategoryFailure: GetPassionCategoryFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const togglePassions: TogglePassions = (state, { payload }) => {
  state.categories = state.categories.map((category) => {
    if (category.id === payload.categoryId) {
      const find = category.passions.find(
        (passion) => (!!passion?.id && !!payload?.id && passion?.id === payload?.id) || passion.name === payload.name,
      );
      return {
        ...category,
        passions: find
          ? category.passions.map((passion, _index, passions) => {
              if (!!passion?.id && !!payload?.id && passion?.id === payload.id) {
                return { ...passion, selected: !passion.selected };
              } else if (passion.name === payload.name) {
                return { ...passion, selected: !passion.selected };
              }
              return passion;
            })
          : [{ ...payload, selected: true, categories: payload.categoryId }, ...category.passions],
      };
    }
    return category;
  });
};

const toggleEditPassions: ToggleEditPassions = (state, { payload }) => {
  state.isEditing = payload;
};

const toggleRecomendedPassions: ToggleRecomendedPassions = (state, { payload }) => {
  state.recomended = state.recomended.map((passion) => (passion.id === payload.id ? { ...passion, selected: !passion?.selected } : passion));
};

const updatePassionsRequest: UpdatePassionsRequest = (state) => {
  state.loading = true;
  state.err = null;
};

const updatePassionsSuccess: UpdatePassionsSuccess = (state) => {
  state.loading = false;
};

const updatePassionsFailure: UpdatePassionsFailure = (state, { payload }) => {
  state.loading = false;
  state.err = payload;
};

const toggleSelectPassions: ToggleSelectPassions = (state) => {
  state.selectCategories = state.categories.map((category: any) => category.passions.filter((passion: any) => passion.selected == true)).flat();
};
const clearPassionsData: ClearPassionsData = () => initialState;

const reducers = {
  getPassionCategoryRequest,
  getPassionCategorySuccess,
  getPassionCategoryFailure,
  getRecomendedPassionsRequest,
  getRecomendedPassionsSuccess,
  getRecomendedPassionsFailure,
  togglePassions,
  clearPassionsData,
  toggleEditPassions,
  toggleRecomendedPassions,
  updatePassionsRequest,
  updatePassionsSuccess,
  updatePassionsFailure,
  toggleSelectPassions,
};

const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(authActions.logout, () => initialState);
};

export default createSlice({ name, initialState, reducers, extraReducers });
