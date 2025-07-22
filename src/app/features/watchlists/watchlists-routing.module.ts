import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'watchlists',
    children: [
      { path: '', pathMatch: 'full', component: CatalogComponent },
      { path: ':watchlistId/details', component: DetailsComponent },
      { path: 'create', component: CreateComponent },
      { path: ':watchlistId/edit', component: EditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistsRoutingModule {}
