import { createActionGroup } from "@ngrx/store";

import { props } from "@ngrx/store";

import { emptyProps } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import { Status } from "../models/status.model";

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
        updateTodoWithOrder: props<{ todo: Todo, position: number, fromStatusCategory: Status, toStatusCategory: Status }>(),
        updateTodoSuccess: props<{ todo: Todo }>(),
        updateTodoFailure: emptyProps(),

        deleteTodo: props<{ id: string }>(),
        deleteTodoSuccess: props<{ id: string }>(),
        deleteTodoFailure: emptyProps(),
    },
});
