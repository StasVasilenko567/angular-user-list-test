import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { todoSelectors } from "../../store/todo.selectors";
import { todoActions } from "../../store/todo.actions";
import { StatusTowerComponent } from "../status-tower/status-tower.component";
import { Status } from "../../models/status.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.css'],
    standalone: true,
    imports: [StatusTowerComponent, CommonModule],
})
export class TodoKanbanComponent implements OnInit {
    private readonly store = inject(Store);

    public statuses = Object.values(Status);
    public todos$ = this.store.select(todoSelectors.selectTodos);

    public ngOnInit(): void {
        this.store.dispatch(todoActions.loadTodos());
    }
}