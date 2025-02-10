import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./pages/users-page/user-page.module').then(m => m.UsersPageModule)
    },
    {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar-page/calendar-page.module').then(m => m.CalendarPageModule)
    },
    {
        path: 'todo',
        loadChildren: () => import('./pages/todo-kanban/todo.module').then(m => m.TodoKanbanModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('./pages/charts-page/charts.module').then(m => m.ChartsModule)
    },
    {
        path: '**',
        redirectTo: '/users',
    }
];
