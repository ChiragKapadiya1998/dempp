import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type PassionMeta = {
  page?: number;
  pageSize?: number;
  query: string;
};

export type PassionCategory = {
  id: number;
  name: string;
  passions: Passion[];
  creatorId: null | number;
  createdAt: Date;
  updated_at: Date;
};
export type PassionCategoryEdit = {
  id: number;
  name: string;
  passions: Passion[];
  creatorId: null | number;
  createdAt: Date;
  updated_at: Date;
  isShowVisible: boolean;
  toggleOther: () => void;
  onPreesShow?: () => void;
};

export type PassionFromResponse = {
  id?: number;
  name: string;
  categoryId?: number;
};

export interface Passion extends PassionFromResponse {
  selected: boolean;
}

export type State = {
  loading: boolean;
  err: null | string;
  recomended: Passion[];
  categories: PassionCategory[];
  selectCategories: PassionCategory[];
  meta: PassionMeta;
  isEditing: boolean;
};

export type GetRecomendedPassionsRequest = CaseReducer<State, PayloadAction<{ query: string }>>;
export type GetRecomendedPassionsSuccess = CaseReducer<State, PayloadAction<Passion[]>>;
export type GetRecomendedPassionsFailure = CaseReducer<State, PayloadAction<string>>;

export type GetPassionCategoryRequest = CaseReducer<State>;
export type GetPassionCategorySuccess = CaseReducer<State, PayloadAction<PassionCategory[]>>;
export type GetPassionCategoryFailure = CaseReducer<State, PayloadAction<string>>;

export type TogglePassions = CaseReducer<State, PayloadAction<Passion>>;
export type ToggleSelectPassions = CaseReducer<State>;
export type ToggleEditPassions = CaseReducer<State, PayloadAction<boolean>>;
export type ToggleRecomendedPassions = CaseReducer<State, PayloadAction<Passion>>;

export type UpdatePassionsRequest = CaseReducer<State>;
export type UpdatePassionsSuccess = CaseReducer<State>;
export type UpdatePassionsFailure = CaseReducer<State, PayloadAction<string>>;

export type ClearPassionsData = CaseReducer<State>;
