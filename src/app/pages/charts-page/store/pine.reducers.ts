import { createFeature, createReducer, on } from "@ngrx/store";
import { pineActions } from "./pine.actions";
import { switchMap } from "rxjs";

export interface PinesState {
    isLoading: boolean;
    isError: boolean;
    data: {
        pines: number[];
    }
}

export const initialState: PinesState = {
    isLoading: false,
    isError: false,
    data: {
        pines: [],
    },
};

export const pineFeatureKey = 'pine';
export const pineFeature = createFeature({
    name: pineFeatureKey,
    reducer: createReducer(
        initialState,
        on(
            pineActions.loadPines,
            (state) => ({ 
                ...state, 
                isLoading: true,
                isError: false,
            })
        ),
        on(
            pineActions.loadPinesSuccess,
            (state, action) => ({
                ...state, 
                isLoading: false,
                isError: false,
                data: { pines: action.pines },
            })
        ),
        on(
            pineActions.loadPinesFailure,
            (state) => ({
                ...state, 
                isLoading: false, 
                isError: true,
            })
        )
    )
});