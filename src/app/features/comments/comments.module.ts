import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent,} from './edit/edit.component';
import { CommentsRoutingModule } from './comments.routing.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule
  ]
})
export class CommentsModule { }
