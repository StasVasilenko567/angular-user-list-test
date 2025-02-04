import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { Store } from "@ngrx/store";
import { todoSelectors } from "../store/todo.selectors";
import { todoActions } from "../store/todo.actions";
import { Status } from "../models/status.model";

@Injectable()
export class OrderService {
    private readonly store = inject(Store);

    private readonly todos$ = this.store.select(todoSelectors.selectTodos);
    private allTodos: Todo[] = [];

    constructor() { 
        this.todos$.subscribe((todos: Todo[]) => this.allTodos = todos);
    }

    public order(insertedTodo: Todo, newOrder: number, from: Status, to: Status): void {
        const toTodos: Todo[] = this.allTodos.filter((todo) => todo.status === to).map((todo) => this.copyTodo(todo));

        if (from === to) {
            toTodos.splice(toTodos.indexOf(insertedTodo), 1);
        }

        const tempTodo = this.copyTodo(insertedTodo);

        if (toTodos.length > 0) {
            if (newOrder === 0) {
                tempTodo.order = toTodos[0].order - 1;
            } else if(newOrder-1 === toTodos.length-1) {
                tempTodo.order = toTodos[toTodos.length-1].order + 1;
                console.log("fff");
            } else {
                console.log("ABOBA");
                tempTodo.order = toTodos[newOrder-1].order + 1;
            }
        } else {
            tempTodo.order = 1;
        }
        
        tempTodo.status = to;
        this.store.dispatch(todoActions.updateTodo({id: tempTodo.id, todo: tempTodo}));
        if (toTodos[newOrder] && toTodos[newOrder].order <= tempTodo.order) {
            console.log("ok");
            for (let i = newOrder; i < toTodos.length; i++) {
                toTodos[i].order = toTodos[i].order + 1;
                this.store.dispatch(todoActions.updateTodo({id: toTodos[i].id, todo: toTodos[i]}));
            }
        }
    }

    public createTodo(todo: Todo, status: Status): void {
        const todoList = this.allTodos.filter((todo) => todo.status === status);
        let newOrder: number;
        if (todoList.length !== 0) {
            newOrder = todoList.length + 1;
        } else {
            newOrder = 1;
        }
        this.store.dispatch(todoActions.createTodo({ todo: { ...todo, order: newOrder } }));
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