import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { WorkSheduleRow } from "../models/work-shedule-row.model";
import { workersFeatureKey } from "./workers.config";

export const workersActions = createActionGroup({
    source: workersFeatureKey,
    events: {
        loadWorkers: emptyProps(),
        loadWorkersSuccess: props<{ workers: WorkSheduleRow[] }>(),
        addEmployee: props<{ employee: WorkSheduleRow }>(),
        addEmployeeSuccess: props<{ employee: WorkSheduleRow }>(),
    }
});