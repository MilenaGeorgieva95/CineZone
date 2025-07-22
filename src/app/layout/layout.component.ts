import { Component,ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../features/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private router: Router) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

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
