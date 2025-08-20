import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './features/movies/catalog/catalog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
   { path: '', component: CatalogComponent },
   { path: 'home', pathMatch: 'full', redirectTo: 'catalog' },
   { path: 'logout', component: CatalogComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
