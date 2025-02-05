import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { Store } from "@ngrx/store";
import { todoSelectors } from "../store/todo.selectors";
import { todoActions } from "../store/todo.actions";
import { Status } from "../models/status.model";

@Injectable({ providedIn: "root" })
export class OrderService {
    private readonly store = inject(Store);

    private readonly todos$ = this.store.select(todoSelectors.selectTodos);
    private allTodos: Todo[] = [];

    constructor() { 
        this.todos$.subscribe((todos: Todo[]) => this.allTodos = todos);
    }

    public moveCard(insertedCard: Todo, position: number, fromStatusCategory: Status, toStatusCategory: Status): void {
        let filteredTodo: Todo[] = this.allTodos.filter((todo) => todo.status === toStatusCategory).map((todo) => this.copyTodo(todo));

        if (fromStatusCategory !== toStatusCategory) {
            filteredTodo.splice(position, 0, insertedCard);
        }

        const tempTodo = this.copyTodo(insertedCard);

        if (filteredTodo.length > 1) {
            if (position === 0) {
                tempTodo.order = filteredTodo[fromStatusCategory === toStatusCategory ? 0 : 1].order - 1;
            } else if(position === filteredTodo.length-1) {
                tempTodo.order = filteredTodo[filteredTodo.length - (fromStatusCategory !== toStatusCategory ? 2 : 1)].order + 1;
            } else {
                tempTodo.order = filteredTodo[position-1].order + 1;
            }
        } else {
            tempTodo.order = 1;
        }
        const curIndex = filteredTodo.findIndex((todo) => todo.id === tempTodo.id);
        tempTodo.status = toStatusCategory;
        filteredTodo[curIndex] = tempTodo;
        filteredTodo = filteredTodo.sort((a, b) => a.order - b.order);
        this.store.dispatch(todoActions.updateTodo({id: tempTodo.id, todo: tempTodo}));

        // this.recursiveOrder(position, filteredTodo, tempTodo.order);
    }

    public createCard(todo: Todo, status: Status): void {
        const todoList = this.allTodos.filter((todo) => todo.status === status);
        let newOrder: number;
        if (todoList.length !== 0) {
            newOrder = todoList[todoList.length-1].order + 1;
        } else {
            newOrder = 1;
        }
        this.store.dispatch(todoActions.createTodo({ todo: { ...todo, order: newOrder } }));
    }

    private recursiveOrder(currentIndex: number, todoList: Todo[], cardOrder: number): void {
        if (todoList[currentIndex] && todoList[currentIndex].order <= cardOrder) {
            todoList[currentIndex] = {...todoList[currentIndex], order: cardOrder + 1};
            this.store.dispatch(todoActions.updateTodo({id: todoList[currentIndex].id, todo: todoList[currentIndex]}));

            this.recursiveOrder(currentIndex+1, todoList, todoList[currentIndex-1]?.order);
        }
    }

    private copyTodo(old: Todo): Todo {
        return { ...old };
    }
}