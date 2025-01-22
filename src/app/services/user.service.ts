import { inject, Injectable } from "@angular/core";
import { UserApiService } from "./userapi.service";
import { BehaviorSubject } from "rxjs";
import { User } from "@models/User";

@Injectable({providedIn: "root"})
export class UserService {
    private apiService = inject(UserApiService);

    private readonly userServiceSubject = new BehaviorSubject<User[]>([]);
    public readonly users$ = this.userServiceSubject.asObservable();

    getUsers() {
        this.apiService.getUsers().subscribe(
            (val: User[]) => this.userServiceSubject.next(val)
        )
    }

    deleteUser(id: string) {
        this.apiService.deleteUser(id).subscribe(
            (val: User) => this.userServiceSubject.next(
                this.userServiceSubject.getValue().filter(user => user.id !== val.id)
            )
        )
    }

    addUser(user: User) {
        this.apiService.addUser(user).subscribe(
            (val: User) => this.userServiceSubject.next(
                [...this.userServiceSubject.getValue(), val]
            )
        )
    }

    updateUser(id: string, user: User) {
        this.apiService.updateUser(id, user).subscribe(
            (val: User) => this.userServiceSubject.next(
                this.userServiceSubject.getValue().map((u: User) => u.id === val.id ? val : u)
            )
        )
    }
}
