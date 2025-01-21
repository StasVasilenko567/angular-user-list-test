import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'users',
        component: AppComponent
    },
    {
        path: '**',
        redirectTo: '/users',
    }
];
