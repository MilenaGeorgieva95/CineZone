import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { EMAIL_DOMAINS } from 'src/app/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loading = false;
  errMsg: string = '';

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, Validators.email, emailValidator(EMAIL_DOMAINS)],
    ],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(3)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  handleSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('passGroup')?.get('password')?.value;

    if (username && email && password) {
      this.userService.register(username, email, password).subscribe({
        next: () => {
          this.registerForm.reset();
          this.router.navigate(['/catalog']);
          this.loading = false;
          this.registerForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errMsg = `Error occured: ${err.error.error || err.message}!`;
          console.log(err);
          
        },
      });
    }
  }
}
