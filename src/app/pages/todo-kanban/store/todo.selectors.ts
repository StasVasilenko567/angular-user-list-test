import { createFeatureSelector, createSelector } from "@ngrx/store";
import { todoFeatureKey, TodoState } from "./todo.reducers";

const selectFeature = createFeatureSelector<TodoState>(todoFeatureKey);
const selectTodos = createSelector(selectFeature, (state: TodoState) => state.data.todos);
const selectIsLoading = createSelector(selectFeature, (state: TodoState) => state.isLoading);
const selectIsError = createSelector(selectFeature, (state: TodoState) => state.isError);

export const todoSelectors = {
  selectTodos,
  selectIsLoading,
  selectIsError,
};
