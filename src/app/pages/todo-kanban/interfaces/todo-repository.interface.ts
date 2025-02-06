import { Observable } from "rxjs";
import { Todo } from "../models/todo.model";

export interface TodoRepository {
    getTodos(): Observable<Todo[]>;
    createTodo(todo: Todo): Observable<Todo>;
    updateTodo(id: string, todo: Todo): Observable<Todo>;
    deleteTodo(id: string): Observable<Todo>;
}