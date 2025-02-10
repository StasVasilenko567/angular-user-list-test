import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const pineActions = createActionGroup({
    source: 'Pine',
    events: {
        loadPines: emptyProps(),
        loadPinesSuccess: props<{ pines: any[] }>(),
        loadPinesFailure: emptyProps(),
    }
})