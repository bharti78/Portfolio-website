import { Routes } from '@angular/router';

export const routes: Routes = [
  // Add routes here as needed
  // For now, this is a single-page portfolio app
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];
