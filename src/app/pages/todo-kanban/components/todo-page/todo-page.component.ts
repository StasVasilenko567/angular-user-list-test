import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { todoSelectors } from "../../store/todo.selectors";
import { todoActions } from "../../store/todo.actions";
import { StatusTowerComponent } from "../status-tower/status-tower.component";
import { Status } from "../../models/status.model";
import { CommonModule } from "@angular/common";
import { Todo } from "../../models/todo.model";
import { CdkDropListGroup } from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.css'],
    standalone: true,
    imports: [StatusTowerComponent, CommonModule, CdkDropListGroup],
})
export class TodoKanbanComponent implements OnInit {
    private readonly store = inject(Store);

    public statuses = Object.values(Status);
    public todos$ = this.store.select(todoSelectors.selectTodos);

    ngOnInit() {
        this.store.dispatch(todoActions.loadTodos());
    }

    public getTodosByStatus(status: Status): Observable<Todo[]> {
        return this.todos$.pipe(
            map((todos) => todos.filter((todo) => todo.status === status).sort((a, b) => a.order - b.order))
        );
    }
}
