import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'api/catalog', loadComponent: () => import('./catalog/catalog').then(m => m.Catalog) },
    { path: 'api/cart', loadComponent: () => import('./cart/cart').then(m => m.Cart) },
    { path: 'api/user', loadComponent: () => import('./user/user').then(m => m.User) },
    { path: '**', redirectTo: '' }
];
