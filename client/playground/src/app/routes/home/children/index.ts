import { Route } from '@angular/router';
import { ArmorRoute } from './armor.route';
import { CategoriesRoute } from './categories.route';
import { ItemsRoute } from './items.route';
import { WeaponsRoute } from './weapons.route';

export const HomeChildComponents = [
  ArmorRoute,
  CategoriesRoute,
  ItemsRoute,
  WeaponsRoute
];

export const HomeChildRoutes: Route[] = [
  { path: 'armor', component: ArmorRoute },
  { path: 'categories', component: CategoriesRoute },
  { path: 'items', component: ItemsRoute },
  { path: 'weapons', component: WeaponsRoute },
  { path: '', redirectTo: 'categories', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'categories', pathMatch: 'prefix' }
]
