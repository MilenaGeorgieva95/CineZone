import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  {
    path: 'movies',
    children: [
      { path: '', pathMatch: 'full', component:CatalogComponent },
      { path: ':movieId/details', component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
