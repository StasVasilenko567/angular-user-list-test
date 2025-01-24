import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducers";

const selectFeature = createFeatureSelector<UserState>(userFeatureKey);
const selectUsers = createSelector(selectFeature, (state: UserState) => state.data.users);

export const userSelectors = {
  selectUsers,
};