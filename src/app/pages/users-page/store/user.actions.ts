import { User } from "app/pages/users-page/models/user.model";
import { emptyProps, props } from "@ngrx/store";

import { createActionGroup } from "@ngrx/store";

export const userActions = createActionGroup({
  source: 'User',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: emptyProps(), 

    updateUser: props<{ id: string, user: User }>(),
    updateUserSuccess: props<{ user: User }>(),
    updateUserFailure: emptyProps(),

    addUser: props<{ user: User }>(),
    addUserSuccess: props<{ user: User }>(),
    addUserFailure: emptyProps(),

    deleteUser: props<{ id: string }>(),
    deleteUserSuccess: props<{ id: string }>(),
    deleteUserFailure: emptyProps(),
  },
});
