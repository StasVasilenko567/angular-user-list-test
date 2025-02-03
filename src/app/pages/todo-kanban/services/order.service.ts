import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { Store } from "@ngrx/store";
import { todoSelectors } from "../store/todo.selectors";
import { todoActions } from "../store/todo.actions";
import { Status } from "../models/status.model";

@Injectable()
export class OrderService {
    private readonly store = inject(Store);

    public Order(insertedTodo: Todo, newOrder: number, from: Status, to: Status): void {
        const todos$ = this.store.select(todoSelectors.selectTodos);

        let fromTodos: Todo[] = [];
        const fromSub = todos$.subscribe((todos: Todo[]) => fromTodos = todos.filter((todo) => todo.status === from).map((todo) => this.copyTodo(todo))); 
        fromSub.unsubscribe();

        let toTodos: Todo[] = [];
        const toSub = todos$.subscribe((todos: Todo[]) => toTodos = todos.filter((todo) => todo.status === to).map((todo) => this.copyTodo(todo)));
        toSub.unsubscribe();

        if (from !== to) {
            fromTodos.splice(fromTodos.indexOf(insertedTodo), 1);
            toTodos.push(this.copyTodo(insertedTodo));
        }
        
        toTodos.find((todo) => todo.id === insertedTodo.id)!.order = newOrder;

        fromTodos.map((todo, i) => { todo.order = i });

        toTodos.map((todo, i) => {
            if (todo.id !== insertedTodo.id) {
                todo.order = i;
            }
        });

        console.log(fromTodos);
        console.log(toTodos);
    }

    private copyTodo(old: Todo): Todo {
        let todo: Todo = {
            id: old.id,
            title: old.title,
            description: old.description,
            status: old.status,
            createdAt: old.createdAt,
            order: old.order,
        }
        return todo;
    }
}