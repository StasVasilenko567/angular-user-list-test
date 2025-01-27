import { User } from "@models/user.model";
import { createFeature, createReducer, on } from "@ngrx/store";
import { userActions } from "./user.actions";

export interface UserState {
  isLoading: boolean;
  isError: boolean;
  data: {
    users: User[];
  }
}

export const initialState: UserState = {
  isLoading: false,
  isError: false,
  data: {
    users: [],
  },
};

export const userFeatureKey = 'user';
export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(
        userActions.loadUsers, 
        (state) => ({ 
            ...state, 
            isLoading: true 
        })
    ),
    on(
        userActions.loadUsersSuccess, 
        (state, action) => ({ 
            ...state, 
            isLoading: false, 
            data: { users: action.users } 
        })
    ),
    on(
        userActions.loadUsersFailure, 
        (state) => ({ 
            ...state, 
            isLoading: false, 
            isError: true 
        })
    ),
    on(
        userActions.updateUser, 
        (state) => ({ 
            ...state, 
            isLoading: true 
        })
    ),
    on(
        userActions.updateUserSuccess, 
        (state, action) => ({ 
            ...state, 
            isLoading: false, 
            data: { users: state.data.users.map((user) => user.id === action.user.id ? action.user : user) } 
        })
    ),
    on(
        userActions.updateUserFailure, 
        (state) => ({ 
            ...state, 
            isLoading: false, 
            isError: true 
        })
    ),
    on(
        userActions.addUser, 
        (state) => ({ 
            ...state, 
            isLoading: true 
        })
    ),
    on(
        userActions.addUserSuccess, 
        (state, action) => ({ 
            ...state, 
            isLoading: false, 
            data: { users: [...state.data.users, action.user] } })
    ),
    on(
        userActions.addUserFailure, (state) => ({ 
            ...state, 
            isLoading: false, 
            isError: true 
        })
    ),
    on(
        userActions.deleteUser, 
        (state) => ({ 
            ...state, 
            isLoading: true 
        })
    ),
    on(
        userActions.deleteUserSuccess, 
        (state, action) => ({ 
            ...state, 
            isLoading: false, 
            data: { users: state.data.users.filter((user) => user.id !== action.id) } 
        })
    ),
    on(
        userActions.deleteUserFailure, 
        (state) => ({ 
            ...state, 
            isLoading: false, 
            isError: true 
        })
    ),
  ),
});
