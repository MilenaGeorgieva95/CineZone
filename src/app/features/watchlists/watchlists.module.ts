import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent} from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistsRoutingModule } from './watchlists-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MyWatchlistsComponent } from './my-watchlists/my-watchlists.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CatalogComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent,
    MyWatchlistsComponent
  ],
  imports: [
    CommonModule,
    WatchlistsRoutingModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class WatchlistsModule { }
