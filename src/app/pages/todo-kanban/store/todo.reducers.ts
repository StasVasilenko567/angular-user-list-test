import { createReducer, on } from "@ngrx/store";
import { createFeature } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import { todoActions } from "./todo.actions";

export interface TodoState {
    isLoading: boolean;
    isError: boolean;
    data: {
        todos: Todo[];
    }
}

export const initialState: TodoState = {
    isLoading: false,
    isError: false,
    data: {
        todos: [],
    },
};

export const todoFeatureKey = 'todo';
export const todoFeature = createFeature({
    name: todoFeatureKey,
    reducer: createReducer(
        initialState,
        on(
            todoActions.loadTodos,
            (state) => ({ 
                ...state, 
                isLoading: true,
                isError: false,
            })
        ),
        on(
            todoActions.loadTodosSuccess,
            (state, action) => ({ 
                ...state, 
                isLoading: false,
                data: { todos: action.todos },
            })
        ),
        on(
            todoActions.loadTodosFailure,
            (state) => ({ 
                ...state, 
                isLoading: false, 
                isError: true,
            })
        ),
        on(
            todoActions.createTodo,
            (state, action) => ({ 
                ...state, 
                isLoading: true,
                isError: false,
            })
        ),
        on(
            todoActions.createTodoSuccess,
            (state, action) => ({ 
                ...state, 
                isLoading: false, 
                data: { todos: [...state.data.todos, action.todo] },
            })
        ),
        on(
            todoActions.createTodoFailure,
            (state) => ({ 
                ...state, 
                isLoading: false, 
                isError: true,
            })
        ),
        on(
            todoActions.updateTodo,
            (state, action) => ({ 
                ...state, 
                isLoading: true,
                isError: false,
            })
        ),
        on(
            todoActions.updateTodoSuccess,
            (state, action) => ({ 
                ...state, 
                isLoading: false, 
                data: { todos: state.data.todos.map(todo => todo.id === action.todo.id ? action.todo : todo) },
            })
        ),
        on(
            todoActions.updateTodoFailure,
            (state) => ({ 
                ...state, 
                isLoading: false, 
                isError: true,
            })
        ),        
        on(
            todoActions.deleteTodo,
            (state, action) => ({ 
                ...state, 
                isLoading: true,
                isError: false,
            })
        ),
        on(
            todoActions.deleteTodoSuccess,
            (state, action) => ({ 
                ...state, 
                isLoading: false, 
                data: { todos: state.data.todos.filter(todo => todo.id !== action.id) },
            })
        ),
        on(
            todoActions.deleteTodoFailure,
            (state) => ({ 
                ...state, 
                isLoading: false, 
                isError: true,
            })
        ),
    ),
});
