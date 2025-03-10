import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { userActions } from "./user.actions";
import { User } from "app/pages/users-page/models/user.model";
import { UserApiService } from "app/pages/users-page/services/userapi.service";

@Injectable()
export class UserEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly userApiService: UserApiService = inject(UserApiService);

  public loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUsers),
    switchMap(() => this.userApiService.getUsers().pipe(
      map((users: User[]) => userActions.loadUsersSuccess({ users })),
      catchError(() => of(userActions.loadUsersFailure()))
    ))
  ));

  public updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.updateUser),
    switchMap((action) => this.userApiService.updateUser(action.id, action.user).pipe(
      map((user: User) => userActions.updateUserSuccess({ user })),
      catchError(() => of(userActions.updateUserFailure()))
    ))
  ));

  public addUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.addUser),
    switchMap((action) => this.userApiService.addUser(action.user).pipe(
      map((user: User) => userActions.addUserSuccess({ user })),
      catchError(() => of(userActions.addUserFailure()))
    ))
  ));

  public deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.deleteUser),
    switchMap((action) => this.userApiService.deleteUser(action.id).pipe(
      map(() => userActions.deleteUserSuccess({ id: action.id })),
      catchError(() => of(userActions.deleteUserFailure()))
    ))
  ));
}
