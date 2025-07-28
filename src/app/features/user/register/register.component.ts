import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rePassword: ['', [Validators.maxLength(4)]],
  });
  passwordError: string = '';
  usernameError: string = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  handleSubmit(): void {
    console.log(this.registerForm.value);
    const { username, email, password, rePassword } = this.registerForm.value;
    if (!username! || !email || !password || !rePassword) {
      this.passwordError = 'Error: All fields are required!';
      return;
    }
    if (username && email && password) {
      this.userService.register(username, email, password);
      this.router.navigate(['/catalog']);
    }
  }

  ngAfterViewInit() {
    if (this.registerForm) {
      this.registerForm.valueChanges.subscribe((x) => {
        if (x.password !== x.rePassword) {
          this.passwordError = "Error: Passwords don't match!";
          return;
        } else {
          this.passwordError = '';
        }
        if (x.username && x.username.length <= 2) {
          this.usernameError = 'Username should be at least 3 characters long!';
        } else if (x.username && x.username.length > 5) {
          this.usernameError =
            'Username should be maximum of 5 characters long!';
        } else {
          this.usernameError = '';
        }
      });
    }
  }
}
