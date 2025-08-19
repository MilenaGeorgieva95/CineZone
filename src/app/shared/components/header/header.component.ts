import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor(private userService: UserService, private router: Router) {
  this.isLoggedIn$ = this.userService.isAuthSubject$$;
 }

 isLoggedIn$: Observable<boolean>;
 
  get isLoggedIn(): boolean {
    return this.userService.isAuth;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/catalog']);
  }
}
