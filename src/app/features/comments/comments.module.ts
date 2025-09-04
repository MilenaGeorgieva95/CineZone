import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent,} from './edit/edit.component';
import { CommentsRoutingModule } from './comments.routing.module';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class CommentsModule { }
