import { Component, inject, OnInit } from "@angular/core";
import { WorkersTableComponent } from "../workers-table/workers-table.component";
import { WorkersFacade } from "../../facades/workers.facade";
import { WorkerToolboxComponent } from "../worker-toolbox/worker-toolbox.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-workers-list',
    templateUrl: './worker-list.component.html',
    styleUrls: ['./worker-list.component.css'],
    imports: [
    WorkersTableComponent,
    WorkerToolboxComponent,
    CommonModule,
],
    providers: [WorkersFacade]
})
export class WorkersListComponent implements OnInit {
    private workersFacade = inject(WorkersFacade);

    public ngOnInit(): void {
        this.workersFacade.loadWorkers();
    }
}