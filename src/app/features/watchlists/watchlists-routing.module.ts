import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { AuthActivate } from 'src/app/core/guards/auth.activate';
import { OwnerGuard } from 'src/app/core/guards/is-owner.activate';
import { MyWatchlistsComponent } from './my-watchlists/my-watchlists.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CatalogComponent },
  { path: ':watchlistId/details', component: DetailsComponent },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthActivate],
  },
  {
    path: ':watchlistId/edit',
    component: EditComponent,
    canActivate: [OwnerGuard],
  },
  {
    path: 'mywatchlists',
    component: MyWatchlistsComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistsRoutingModule {}
