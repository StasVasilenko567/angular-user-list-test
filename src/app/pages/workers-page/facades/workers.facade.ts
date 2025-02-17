import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { workersActions } from "../store/workers.actions";
import { workersSelectors } from "../store/workers.selectors";
import { WorkSheduleRow } from "../models/work-shedule-row.model";

@Injectable()
export class WorkersFacade {
    private readonly store = inject(Store);

    public readonly workers = this.store.selectSignal(workersSelectors.selectWorkers);

    public loadWorkers() {
        this.store.dispatch(workersActions.loadWorkers());
    }

    public addEmployee(employee: WorkSheduleRow) {
        this.store.dispatch(workersActions.addEmployee({ employee }));
    }
}