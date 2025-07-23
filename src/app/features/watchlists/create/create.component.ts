import { Component } from '@angular/core';
import { WatchlistsService } from '../services/watchlists.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private watchlistsService: WatchlistsService) {}
  createWatchlist(e: Event, title: string, description: string) {
    e.preventDefault();
    this.watchlistsService
      .createWatchlist(title, description)
      .subscribe((e) => console.log(e));
  }
}
