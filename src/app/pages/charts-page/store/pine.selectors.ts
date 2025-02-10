import { createFeatureSelector, createSelector } from "@ngrx/store";
import { pineFeatureKey, PinesState } from "./pine.reducers";

const selectFeature = createFeatureSelector<PinesState>(pineFeatureKey);
const selectPines = createSelector(selectFeature, (state: PinesState) => state.data.pines);

export const pineSelectors = {
    selectPines,
};