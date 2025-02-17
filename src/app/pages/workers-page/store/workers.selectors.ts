import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WorkerState } from "./workers.reducers";
import { workersFeatureKey } from "./workers.config";

const selectFeature = createFeatureSelector<WorkerState>(workersFeatureKey);
const selectWorkers = createSelector(selectFeature, (state: WorkerState) => state.data.workers);

export const workersSelectors = {
    selectWorkers
}