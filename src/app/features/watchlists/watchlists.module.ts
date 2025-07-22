import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent} from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistsRoutingModule } from './watchlists-routing.module';



@NgModule({
  declarations: [
    CatalogComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    WatchlistsRoutingModule
  ],
})
export class WatchlistsModule { }
