import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then((m) => m.Home) },
  {
    path: 'api/catalog',
    loadComponent: () => import('./components/catalog/catalog').then((m) => m.Catalog),
  }, // идём создавать Component
  { path: 'api/cart', loadComponent: () => import('./components/cart/cart').then((m) => m.Cart) },
  { path: 'api/user', loadComponent: () => import('./components/user/user').then((m) => m.User) },
  { path: '**', redirectTo: '' },
];
