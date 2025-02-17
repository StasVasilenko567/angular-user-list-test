import { createFeature, createReducer, on } from "@ngrx/store";
import { WorkSheduleRow } from "../models/work-shedule-row.model";
import { workersActions } from "./workers.actions";
import { workersFeatureKey } from "./workers.config";

export interface WorkerState {
    data: {
        workers: WorkSheduleRow[];
    }
};

export const initialState: WorkerState = {
    data: {
        workers: [],
    },
};

export const workersFeature = createFeature({
    name: workersFeatureKey,
    reducer: createReducer(
        initialState,
        on(
            workersActions.loadWorkers,
            (state) => ({
                ...state,
            })
        ),
        on(
            workersActions.loadWorkersSuccess,
            (state, action) => ({
                ...state,
                data: { workers: action.workers },
            })
        ),
        on(
            workersActions.addEmployee,
            (state, action) => ({
                ...state,
            })
        ),
        on(
            workersActions.addEmployeeSuccess,
            (state, action) => ({
                ...state,
                data: { workers: [...state.data.workers, action.employee] },
            })
        )
    )
});