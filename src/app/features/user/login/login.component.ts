import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  formSubmithandler(form: NgForm) {
    console.log(form.value);

    const { email, password } = form?.value;
    this.userService.login(email, password);
    form.setValue({ email: '', password: '' });
    this.router.navigate(['/catalog']);
  }
}
