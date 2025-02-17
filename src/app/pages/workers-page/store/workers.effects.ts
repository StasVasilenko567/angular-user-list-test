import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WorkerApiService } from "../services/worker-api.service";
import { workersActions } from "./workers.actions";
import { map, switchMap } from "rxjs";
import { WorkSheduleRow } from "../models/work-shedule-row.model";
import { WorkerDTO } from "../models/dto/workers-dto.model";

@Injectable()
export class WorkersEffects {
    private readonly actions$ = inject(Actions);
    private readonly apiService = inject(WorkerApiService);

    public loadWorkers$ = createEffect(() => this.actions$.pipe(
        ofType(workersActions.loadWorkers),
        switchMap(() => this.apiService.getWorkers().pipe(
            map((workers: WorkerDTO[]) => workersActions.loadWorkersSuccess({ workers: workers.map((worker: WorkerDTO) => worker.data) })),
        ))
    ));

    public addEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(workersActions.addEmployee),
        switchMap((action) => this.apiService.addEmployee(action.employee).pipe(
            map((employee: WorkerDTO) => workersActions.addEmployeeSuccess({ employee: employee.data })),
        ))
    ));
}