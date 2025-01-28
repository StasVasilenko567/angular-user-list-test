import { Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersPageComponent
    },
    {
        path: 'calendar',
        component: CalendarPageComponent
    },
    {
        path: '**',
        redirectTo: '/users',
    }
];
