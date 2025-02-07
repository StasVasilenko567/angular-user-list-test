import { Component, inject, Input } from "@angular/core";
import { Status } from "../../models/status.model";
import { Todo } from "../../models/todo.model";
import { Observable } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateTaskDialogComponent } from "../create-task-dialog/create-task-dialog.component";
import { Store } from "@ngrx/store";
import { CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { OrderService } from "../../services/order.service";
import { todoActions } from "../../store/todo.actions";

@Component({
    selector: 'app-status-tower',
    templateUrl: './status-tower.component.html',
    styleUrls: ['./status-tower.component.css'],
    imports: [
        AsyncPipe,
        CommonModule,
        TodoCardComponent,
        MatIconModule,
        MatButtonModule,
        CdkDropList,
    ],
    standalone: true,
})
export class StatusTowerComponent {
    @Input() public status!: Status;
    @Input() public todos$!: Observable<Todo[]>;
    @Input() public connectedTo: Status[]|undefined;
    public readonly dialog = inject(MatDialog);
    private readonly store = inject(Store);
    private readonly orderService = inject(OrderService);

    public statusLabels = {
        [Status.NEW]: 'Новое',
        [Status.READY]: 'Готово',
        [Status.READY_FOR_TEST]: 'Готово для теста',
        [Status.ARCHIVED]: 'Архив',
        [Status.DONE]: 'Выполнено',
    }

    public openCreateTaskDialog(): void {
        const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
            data: { status: this.status },
        });

        dialogRef.afterClosed().subscribe((result: Todo | null) => {
            if (result) {
                const tempTodo: Todo = {
                    id: Date.now().toString(),
                    title: result.title as string,
                    description: result.description as string,
                    status: this.status,
                    createdAt: new Date().toISOString(),
                    order: -1,
                }
                // this.orderService.createCard(tempTodo, this.status);
                this.store.dispatch(todoActions.createTodo({ todo: tempTodo }));
            }
        });
    }

    public drop(event: CdkDragDrop<Status>): void {
        // this.orderService.moveCard(event.item.data, event.currentIndex, event.previousContainer.data, event.container.data);
        this.store.dispatch(todoActions.updateTodoWithOrder({ todo: event.item.data, position: event.currentIndex, fromStatusCategory: event.previousContainer.data, toStatusCategory: event.container.data }));
    }
}
