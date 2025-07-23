import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestActivate } from 'src/app/core/guards/guest.activate';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[GuestActivate]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[GuestActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
