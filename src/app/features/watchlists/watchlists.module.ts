import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent} from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistsRoutingModule } from './watchlists-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CatalogComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    WatchlistsRoutingModule,
    FormsModule
  ],
})
export class WatchlistsModule { }
