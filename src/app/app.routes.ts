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
        path: '**',
        redirectTo: '/users',
    }
];
