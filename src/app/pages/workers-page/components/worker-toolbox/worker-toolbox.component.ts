import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { CreateEmployeeDialogComponent } from "../dialogs/create-employee-dialog/create-employee-dialog.component";
import { MatIcon } from "@angular/material/icon";
import { WorkersFacade } from "../../facades/workers.facade";
import { WorkSheduleRow } from "../../models/work-shedule-row.model";

@Component({
    selector: 'app-worker-toolbox',
    templateUrl: './worker-toolbox.component.html',
    styleUrls: ['./worker-toolbox.component.css'],
    imports: [
        MatButton,
        MatIcon,
    ],
    providers: [
        WorkersFacade
    ]
})
export class WorkerToolboxComponent {
    private readonly dialog = inject(MatDialog);
    private readonly workersFacade = inject(WorkersFacade);

    public openCreateDialog() {
        const dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const temp_data: WorkSheduleRow = {
                    departmentId: result.departmentId,
                    department: result.department,
                    employeeId: this.workersFacade.workers().length + 1,
                    employee: result.name,
                    employeeStatus: result.position,
                    collection: []
                };
                this.workersFacade.addEmployee(temp_data);
            }
        });
    }
}