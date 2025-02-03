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
                console.log(result);
                const tempTodo: Todo = {
                    id: Date.now().toString(),
                    title: result.title as string,
                    description: result.description as string,
                    status: this.status,
                    createdAt: new Date().toISOString(),
                    order: 0,
                }
                this.store.dispatch(todoActions.createTodo({ todo: tempTodo }));
            }
        });
    }

    public drop(event: CdkDragDrop<Status>): void {
        // this.store.dispatch(todoActions.updateTodo({ 
        //     id: event.item.data.id, 
        //     todo: { 
        //         ...event.item.data, 
        //         status: event.container.data as Status, 
        //         order: event.currentIndex 
        //     } 
        // }));
        this.orderService.Order(event.item.data, event.currentIndex, event.previousContainer.data, event.container.data);
    }
}
