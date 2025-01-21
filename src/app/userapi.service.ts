import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./models/User";

export const API_ENDPOINTS = {
    HOST: 'http://localhost:3000/',
    USERS: 'users/'
}

@Injectable({providedIn: 'root'})
export class UserApiService {
    private http = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(API_ENDPOINTS.HOST + API_ENDPOINTS.USERS);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(API_ENDPOINTS.HOST + API_ENDPOINTS.USERS + id);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(API_ENDPOINTS.HOST + API_ENDPOINTS.USERS, user);
    }
}