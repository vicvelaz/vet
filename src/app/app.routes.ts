import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'legal',
    loadComponent: () => import('./pages/legal-notice/legal-notice.component').then((m) => m.LegalNoticeComponent),
  },
  {
    path: 'terminos-condiciones',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions.component').then((m) => m.TermsConditionsComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
