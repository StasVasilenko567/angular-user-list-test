import { Component, inject, Input } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { todoActions } from "../../store/todo.actions";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrls: ['./todo-card.component.css'],
    standalone: true,
    imports: [CdkDrag, CommonModule, MatIconModule, MatButtonModule],
})
export class TodoCardComponent {
    @Input() todo!: Todo;
    private readonly store = inject(Store);

    public deleteTodo(): void {
        this.store.dispatch(todoActions.deleteTodo({ id: this.todo.id }));
    }
}
