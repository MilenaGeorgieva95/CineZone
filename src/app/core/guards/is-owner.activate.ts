import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { map, Observable } from "rxjs";
import { UserService } from "src/app/features/user/user.service";
import { WatchlistsService } from "src/app/features/watchlists/services/watchlists.service";


@Injectable({ providedIn: 'root' })

export class OwnerGuard implements CanActivate {
  constructor(private userService: UserService, private watchlistsService:WatchlistsService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const watchlistId = route.params['watchlistId'];
    const userId = this.userService.userId;

    return this.watchlistsService.getById(watchlistId).pipe(
      map(watchlist=> watchlist.ownerId.objectId === userId)
    );
  }
}