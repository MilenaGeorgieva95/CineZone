import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    DetailsComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MoviesModule { }
