import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { todoActions } from "./todo.actions";
import { TodoApiService } from "../services/todoapi.service";
import { Todo } from "../models/todo.model";
import { TodoLocalService } from "../services/todo-local.service";
import { TodoRepository } from "../interfaces/todo-repository.interface";
import { OrderService } from "../services/order.service";

@Injectable()
export class TodoEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly orderService: OrderService = inject(OrderService);
    // private readonly apiService: TodoRepository = inject(TodoApiService);
    private readonly apiService: TodoRepository = inject(TodoLocalService);

    public loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.loadTodos),
        switchMap(() => this.apiService.getTodos().pipe(
            map((todos: Todo[]) => todoActions.loadTodosSuccess({ todos })),
            catchError(() => of(todoActions.loadTodosFailure()))
        ))
    ));

    public createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.createTodo),
        switchMap((action) => this.orderService.createCard(this.apiService, action.todo).pipe(
            map((todo: Todo) => todoActions.createTodoSuccess({ todo })),
            catchError(() => of(todoActions.createTodoFailure()))
        ))
    ));

    public updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.updateTodo),
        switchMap((action) => this.apiService.updateTodo(action.id, action.todo).pipe(
            map((todo: Todo) => todoActions.updateTodoSuccess({ todo })),
            catchError(() => of(todoActions.updateTodoFailure()))
        ))
    ));

    public updateTodoWithOrder$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.updateTodoWithOrder),
        switchMap((action) => {
            this.orderService.moveCard(action.todo, action.position, action.fromStatusCategory, action.toStatusCategory);
            return of({ type: "UPDATE_TODO" })
        })
    ));

    public deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.deleteTodo),
        switchMap((action) => this.apiService.deleteTodo(action.id).pipe(
            map(() => todoActions.deleteTodoSuccess({ id: action.id })),
            catchError(() => of(todoActions.deleteTodoFailure()))
        ))
    ));
}