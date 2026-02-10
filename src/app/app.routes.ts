// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductList } from './features/products/components/product-list/product-list';
import { LandingComponent } from './features/landing/landing';

export const routes: Routes = [
    { path: '', component: LandingComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'products', 
    component: ProductList,
    title: 'Product Management'
  },
  { path: '**', redirectTo: '' }
];