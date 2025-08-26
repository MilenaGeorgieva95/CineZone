import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  domains = EMAIL_DOMAINS;
  lockUntilChange = false;
  loading = false;
  errMsg: string = '';
  private readonly USER_KEY = '[user]';

  constructor(private userService: UserService, private router: Router) {}

  formSubmithandler(form: NgForm) {
    if (form.invalid || this.lockUntilChange) {
      return;
    }
    this.loading = true;

    const { email, password } = form?.value;
    this.userService.login(email, password).subscribe({
      next: (userData) => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        this.router.navigate(['/catalog']);
        this.loading = false;
        this.lockUntilChange = false;
        form.reset();
      },
      error: (err) => {
        this.loading = false;
        form.form.controls['password'].setValue('');
        form.form.controls['password'].markAsUntouched()
        this.lockUntilChange = true;
        this.errMsg = `Error occured: ${err.error.error || err.message}!`;
      },
    });
  }
  onInputChange() {
    if (this.lockUntilChange) {
      this.lockUntilChange = false;
    }
  }
}
