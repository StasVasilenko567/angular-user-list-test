import { Component, inject } from "@angular/core";
import { WorkersFacade } from "../../facades/workers.facade";
import { CommonModule } from "@angular/common";
import { employeeStatus } from "../../models/enums.models";
import { WorkDayColorPipe } from "../../pipes/work-day/work-day-color.pipe";
import { DepartmentManagementService } from "../../services/department-management.service";
import {MatMenuModule} from '@angular/material/menu';
import { WorkSheduleRow } from "../../models/work-shedule-row.model";

@Component({
    selector: 'app-workers-table',
    templateUrl: './workers-table.component.html',
    styleUrls: ['./workers-table.component.css'],
    imports: [
        CommonModule,
        WorkDayColorPipe,
        MatMenuModule,
    ],
    providers: [
        WorkersFacade,
        DepartmentManagementService,
    ]
})
export class WorkersTableComponent {
    private readonly workersFacade = inject(WorkersFacade);
    public readonly numbers = Array(31).fill(0).map((x,i)=>i+1);
    public readonly workers = this.workersFacade.workers;
    public readonly employeeStatus = employeeStatus;
}