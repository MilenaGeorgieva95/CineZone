import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  {
    path: 'comments/:commentId/edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsRoutingModule {}