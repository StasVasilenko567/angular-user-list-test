import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Todo } from "../models/todo.model";
import { TodoRepository } from "../interfaces/todo-repository.interface";

@Injectable({providedIn: "root"})
export class TodoLocalService implements TodoRepository {
    public getTodos(): Observable<Todo[]> {
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
        return of(todos);
    }

    public createTodo(todo: Todo): Observable<Todo> {
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        return of(todo);
    }

    public updateTodo(id: string, todo: Todo): Observable<Todo> {
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            todos[index] = todo;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        return of(todo);
    }

    public deleteTodo(id: string): Observable<Todo> {
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
        const index = todos.findIndex((todo) => todo.id === id);
        const tempTodo: Todo = { ...todos[index], };
        if (index !== -1) {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        return of(tempTodo);
    }
}