import { Component, OnInit } from '@angular/core';
import { WatchlistsService } from '../services/watchlists.service';
import { ApiWatchlistResponse, resWatchlist } from 'src/app/types/watchlist';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  constructor(
    private watchlistService: WatchlistsService,
    private userService: UserService
  ) {}

  watchlists: resWatchlist[] = [];
  currentUserId: string = '';
  loading = false;
  errMsg: string = '';

  ngOnInit(): void {
    this.loading = true;
    this.errMsg=''
    this.currentUserId = this.userService.userId;
    this.watchlistService.getAll().subscribe({
      next: (data: ApiWatchlistResponse) => {
        this.watchlists = data.results || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errMsg = `Error occured: ${err.error.error || err.message}!`;
      },
    });
  }

  delWatchlistHandler(
    ownerId: string,
    watchlistId: string,
    watchlistTitle: string
  ) {
    if (ownerId !== this.currentUserId) {
      return;
    }
    const choice: boolean = confirm(
      `Are you sure you want to delete ${watchlistTitle} watchlist?`
    );
    if (choice) {
      this.loading = true;
      this.errMsg=''
      this.watchlistService.delWatchlist(watchlistId).subscribe({
        next: () => {
          this.watchlists = this.watchlists.filter(
            (w) => w.objectId !== watchlistId
          );

          this.loading = false;
          console.log(`Deleted ${watchlistTitle}`);
        },
        error: (err) => {
          this.loading = false;
          this.errMsg = `Error occured: ${err.error.error || err.message}!`;
        },
      });
    }
  }
}
