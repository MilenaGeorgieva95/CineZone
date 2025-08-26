import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './features/movies/catalog/catalog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GlobalErrorComponent } from './core/global-error/global-error.component';

const routes: Routes = [
   { path: '', component: CatalogComponent },
   { path: 'home', pathMatch: 'full', redirectTo: 'catalog' },
   { path: 'auth', loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule)},
   { path: 'logout', component: CatalogComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'error', component: GlobalErrorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
