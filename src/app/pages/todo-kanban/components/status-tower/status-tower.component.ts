import { Component, inject, Input, AfterViewInit } from "@angular/core";
import { Status } from "../../models/status.model";
import { Todo } from "../../models/todo.model";
import { map, Observable } from "rxjs";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateTaskDialogComponent } from "../create-task-dialog/create-task-dialog.component";
import { generateUID } from "app/pages/users-page/utils/UuidGenerator";
import { todoActions } from "../../store/todo.actions";
import { Store } from "@ngrx/store";
import { CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { OrderService } from "../../services/order.service";
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
    @Input() public filter!: Status;
    @Input() public todos$: Observable<Todo[]>|undefined;
    @Input() public connectedTo: Status[]|undefined;
    public readonly dialog = inject(MatDialog);
    private readonly store = inject(Store);
    // private readonly orderService = inject(OrderService);

    public statusLabels = {
        [Status.NEW]: 'Новое',
        [Status.READY]: 'Готово',
        [Status.READY_FOR_TEST]: 'Готово для теста',
        [Status.ARCHIVED]: 'Архив',
        [Status.DONE]: 'Выполнено',
    }

    public openCreateTaskDialog(): void {
        const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
            data: { filter: this.filter },
        });

        dialogRef.afterClosed().subscribe((result: Todo | null) => {
            if (result) {
                console.log(result);
                const tempTodo: Todo = {
                    id: Date.now().toString(),
                    title: result.title as string,
                    description: result.description as string,
                    status: this.filter as Status,
                    createdAt: new Date().toISOString(),
                    order: 0,
                }
                this.store.dispatch(todoActions.createTodo({ todo: tempTodo }));
            }
        });
    }

    public drop(event: CdkDragDrop<Todo>): void {
        this.store.dispatch(todoActions.updateTodo({ id: event.item.data.id, todo: { ...event.item.data, status: event.container.id as Status, order: event.currentIndex } }));
        // this.orderService.Order(event.item.data, event.currentIndex, event.previousContainer.id as Status, event.container.id as Status);
    }
}
