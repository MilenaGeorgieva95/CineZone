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
  domains=EMAIL_DOMAINS;
  invalidForm:boolean=false;
  constructor(private userService: UserService, private router: Router) {}

  formSubmithandler(form: NgForm) {

    if(form.invalid){
      this.invalidForm=true;
      console.log('Invalid form!');
      return;
    }
    
    const { email, password } = form?.value;
    this.userService.login(email, password);
    form.setValue({ email: '', password: '' });
    this.router.navigate(['/catalog']);
  }
}
