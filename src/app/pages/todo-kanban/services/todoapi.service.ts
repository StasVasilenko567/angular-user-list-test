import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";

const API_ENDPOINTS = {
    HOST: 'http://localhost:3000',
    TODOS: '/todos',
}

@Injectable({
    providedIn: 'root'
})
export class TodoApiService {
    private readonly http = inject(HttpClient);

    getTodos() {
        return this.http.get<Todo[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}`);
    }

    createTodo(todo: Todo) {
        return this.http.post<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}`, todo);
    }

    updateTodo(id: string, todo: Todo) {
        return this.http.put<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}/${id}`, todo);
    }

    deleteTodo(id: string) {
        return this.http.delete<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}/${id}`);
    }

    updateTodos(todos: Todo[]) {
        return this.http.put<Todo[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}`, todos);
    }
}