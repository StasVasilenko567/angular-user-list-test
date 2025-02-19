import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { CreateEmployeeDialogComponent } from "../dialogs/create-employee-dialog/create-employee-dialog.component";
import { MatIcon } from "@angular/material/icon";
import { WorkersFacade } from "../../facades/workers.facade";
import { WorkSheduleRow } from "../../models/work-shedule-row.model";
import { RandomizerService } from "../../services/randomizer.service";

@Component({
    selector: 'app-worker-toolbox',
    templateUrl: './worker-toolbox.component.html',
    styleUrls: ['./worker-toolbox.component.css'],
    imports: [
        MatButton,
        MatIcon,
    ],
    providers: [
        WorkersFacade,
        RandomizerService,
    ]
})
export class WorkerToolboxComponent {
    private readonly dialog = inject(MatDialog);
    private readonly workersFacade = inject(WorkersFacade);
    private readonly randomizerService = inject(RandomizerService);

    public openCreateDialog() {
        const dialogRef = this.dialog.open(CreateEmployeeDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const temp_data: WorkSheduleRow = {
                    departmentId: result.departmentId,
                    department: result.department,
                    employeeId: this.workersFacade.workers().length,
                    employee: result.name,
                    employeeStatus: result.employeeStatus,
                    collection: []
                };
                temp_data.collection = this.randomizerService.randomDays(temp_data);
                this.workersFacade.addEmployee(temp_data);
            }
        });
    }

    public randomWorker() {
        this.randomizerService.randomWorker();
        window.location.reload();
    }
}