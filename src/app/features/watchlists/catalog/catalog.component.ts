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

  ngOnInit(): void {
    this.currentUserId = this.userService.userId;
    this.watchlistService.getAll().subscribe({
      next: (data: ApiWatchlistResponse) => {
        console.log(data);
        this.watchlists = data.results || [];
      },
      error: (err) => console.error(err),
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
      this.watchlistService.delWatchlist(watchlistId).subscribe({
        next: () => {
          this.watchlists = this.watchlists.filter(
            (w) => w.objectId !== watchlistId
          );
          console.log(`Deleted ${watchlistTitle}`);
        },
        error: (err) => console.error('Delete failed:', err),
      });
    }
  }
}
