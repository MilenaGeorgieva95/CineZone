import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService) {}
  registerUser(ev: Event, username: string, email: string, password: string) {
    ev.preventDefault();
    this.userService.register(username, email, password);
  }
}
