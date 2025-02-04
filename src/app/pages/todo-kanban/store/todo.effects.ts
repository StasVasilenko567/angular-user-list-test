import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { todoActions } from "./todo.actions";
import { TodoApiService } from "../services/todoapi.service";
import { Todo } from "../models/todo.model";

@Injectable()
export class TodoEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly todoApiService: TodoApiService = inject(TodoApiService);

    public loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.loadTodos),
        switchMap(() => this.todoApiService.getTodos().pipe(
            map((todos: Todo[]) => todoActions.loadTodosSuccess({ todos })),
            catchError(() => of(todoActions.loadTodosFailure()))
        ))
    ));

    public createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.createTodo),
        switchMap((action) => this.todoApiService.createTodo(action.todo).pipe(
            map((todo: Todo) => todoActions.createTodoSuccess({ todo })),
            catchError(() => of(todoActions.createTodoFailure()))
        ))
    ));

    public updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.updateTodo),
        switchMap((action) => this.todoApiService.updateTodo(action.id, action.todo).pipe(
            map((todo: Todo) => todoActions.updateTodoSuccess({ todo })),
            catchError(() => of(todoActions.updateTodoFailure()))
        ))
    ));

    public deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(todoActions.deleteTodo),
        switchMap((action) => this.todoApiService.deleteTodo(action.id).pipe(
            map(() => todoActions.deleteTodoSuccess({ id: action.id })),
            catchError(() => of(todoActions.deleteTodoFailure()))
        ))
    ));
}