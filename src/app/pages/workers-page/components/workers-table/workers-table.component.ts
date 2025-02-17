import { Component, inject } from "@angular/core";
import { WorkersFacade } from "../../facades/workers.facade";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-workers-table',
    templateUrl: './workers-table.component.html',
    styleUrls: ['./workers-table.component.css'],
    imports: [
        CommonModule,
    ],
    providers: [WorkersFacade]
})
export class WorkersTableComponent {
    private readonly workersFacade = inject(WorkersFacade);

    public readonly workers = this.workersFacade.workers;
}