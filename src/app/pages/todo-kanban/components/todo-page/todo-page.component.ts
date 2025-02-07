import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { todoSelectors } from "../../store/todo.selectors";
import { todoActions } from "../../store/todo.actions";
import { StatusTowerComponent } from "../status-tower/status-tower.component";
import { Status } from "../../models/status.model";
import { CommonModule } from "@angular/common";
import { CdkDropListGroup } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { apiError$ } from "../../services/api-errhandler.service";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.css'],
    standalone: true,
    imports: [StatusTowerComponent, CommonModule, CdkDropListGroup],
})
export class TodoKanbanComponent implements OnInit, OnDestroy {
    private readonly store = inject(Store);
    // private readonly apiErrorHandler = inject(ApiErrorHandlerService);
    private readonly dialog = inject(MatDialog);

    public statuses = Object.values(Status);
    public todos$ = this.store.select(todoSelectors.selectTodos);

    private errorSubscription: Subscription | undefined;

    public ngOnInit() {
        this.store.dispatch(todoActions.loadTodos());

        this.errorSubscription = apiError$.subscribe((error) => {
            if (error !== "") {
                this.openCreateTaskDialog(error);
            }
        });
    }

    public ngOnDestroy(): void {
        this.errorSubscription?.unsubscribe();
    }

    private openCreateTaskDialog(mess: string): void {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { message: mess },
        });
    }
}
