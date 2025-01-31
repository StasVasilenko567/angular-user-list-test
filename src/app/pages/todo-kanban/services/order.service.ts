import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { Store } from "@ngrx/store";
import { todoSelectors } from "../store/todo.selectors";
import { todoActions } from "../store/todo.actions";
import { Status } from "../models/status.model";
import { forkJoin, map } from "rxjs";

@Injectable()
export class OrderService {
    private readonly store = inject(Store);

    public Order(insertedTodo: Todo, newOrder: number, from: Status, to: Status): void {
        const todos$ = this.store.select(todoSelectors.selectTodos);

        this.store.dispatch(todoActions.updateTodo({ id: insertedTodo.id, todo: { ...insertedTodo, status: to, order: newOrder } }));

        const fromTodos = todos$.pipe(
            map((todos) => todos.filter((todo) => todo.status === from).sort((a, b) => a.order - b.order)),
            // map((todos) => [...todos.slice(0, newOrder), insertedTodo, ...todos.slice(newOrder)])
        );

        const toTodos = todos$.pipe(
            map((todos) => todos.filter((todo) => todo.status === to).sort((a, b) => a.order - b.order)),
            map((todos) => [...todos.slice(0, newOrder), insertedTodo, ...todos.slice(newOrder)])
        );
        
        let order = 0;
        fromTodos.subscribe((todos) => {
            todos.forEach((todo) => {
                this.store.dispatch(todoActions.updateTodo({ id: todo.id, todo: { ...todo, order } }));
                order++;
            });
        }).unsubscribe();

        order = 0;
        toTodos.subscribe((todos) => {
            todos.forEach((todo) => {
                this.store.dispatch(todoActions.updateTodo({ id: todo.id, todo: { ...todo, order } }));
                order++;
            });
        }).unsubscribe();
    }
}