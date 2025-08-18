import { Component, OnInit } from '@angular/core';
import { WatchlistsService } from '../services/watchlists.service';
import { ApiWatchlistResponse, resWatchlist } from 'src/app/types/watchlist';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  constructor(private watchlistService: WatchlistsService) {}

  watchlists: resWatchlist[] = [];

  ngOnInit(): void {
    this.watchlistService.getAll().subscribe({
      next: (data: ApiWatchlistResponse) => {
        console.log(data);
        this.watchlists = data.results || [];
      },
      error: (err) => console.error(err),
    });
  }
}
