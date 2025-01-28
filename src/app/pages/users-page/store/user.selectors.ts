import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducers";

const selectFeature = createFeatureSelector<UserState>(userFeatureKey);
const selectUsers = createSelector(selectFeature, (state: UserState) => state.data.users);
const selectIsLoading = createSelector(selectFeature, (state: UserState) => state.isLoading);
const selectIsError = createSelector(selectFeature, (state: UserState) => state.isError);

export const userSelectors = {
  selectUsers,
  selectIsLoading,
  selectIsError,
};
