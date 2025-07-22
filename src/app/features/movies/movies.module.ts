import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DetailsComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  exports:[CatalogComponent, DetailsComponent]
})
export class MoviesModule { }
