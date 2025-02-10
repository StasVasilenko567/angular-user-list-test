import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { Observable } from "rxjs";
import { TodoRepository } from "../interfaces/todo-repository.interface";
import { API_ENDPOINTS } from "app/shared/configs/api-endoints.config";

@Injectable({
    providedIn: 'root'
})
export class TodoApiService implements TodoRepository {
    private readonly http = inject(HttpClient);

    public getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}`);
    }

    public createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}`, todo);
    }

    public updateTodo(id: string, todo: Todo): Observable<Todo> {
        return this.http.patch<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}/${id}`, todo);
    }

    public deleteTodo(id: string): Observable<Todo> {
        return this.http.delete<Todo>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.TODOS}/${id}`);
    }
}