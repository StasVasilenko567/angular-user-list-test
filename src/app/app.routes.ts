import { Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

export const routes: Routes = [
    {
        path: 'users',
        // component: UsersPageComponent
        loadChildren: () => import('./pages/users-page/user-page.module').then(m => m.UsersPageModule)
    },
    {
        path: 'calendar',
        // component: CalendarPageComponent
        loadChildren: () => import('./pages/calendar-page/calendar-page.module').then(m => m.CalendarPageModule)
    },
    {
        path: '**',
        redirectTo: '/users',
    }
];
