import { createActionGroup } from "@ngrx/store";

import { props } from "@ngrx/store";

import { emptyProps } from "@ngrx/store";
import { Todo } from "../models/todo.model";

export const todoActions = createActionGroup({
    source: 'Todo',
    events: {
        loadTodos: emptyProps(),
        loadTodosSuccess: props<{ todos: Todo[] }>(),
        loadTodosFailure: emptyProps(),

        createTodo: props<{ todo: Todo }>(),
        createTodoSuccess: props<{ todo: Todo }>(),
        createTodoFailure: emptyProps(),

        updateTodo: props<{ id: string, todo: Todo }>(),
        updateTodoSuccess: props<{ todo: Todo }>(),
        updateTodoFailure: emptyProps(),

        deleteTodo: props<{ id: string }>(),
        deleteTodoSuccess: props<{ id: string }>(),
        deleteTodoFailure: emptyProps(),

        //Experimental
        updateTodos: props<{ todos: Todo[] }>(),
        updateTodosSuccess: props<{ todos: Todo[] }>(),
        updateTodosFailure: emptyProps(),
    },
});
