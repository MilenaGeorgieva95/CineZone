import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";
import { UserService } from "src/app/features/user/user.service";
import { WatchlistsService } from "src/app/features/watchlists/services/watchlists.service";


@Injectable({ providedIn: 'root' })

export class OwnerGuard implements CanActivate {
  constructor(private userService: UserService, private watchlistsService:WatchlistsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const watchlistId = route.params['watchlistId'];
    const userId = this.userService.userId;

return this.watchlistsService.getById(watchlistId).pipe(
      map(watchlist => (watchlist.ownerId?.objectId || watchlist.ownerId) === userId),
      tap(isOwner => {
        if (!isOwner) {
          this.router.navigate(['/watchlists']); 
        }
      }),
      catchError(() => {
        this.router.navigate(['/watchlists']); 
        return of(false);
      })
    );
  }
}