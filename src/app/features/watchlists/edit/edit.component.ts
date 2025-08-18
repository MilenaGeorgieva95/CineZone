import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WatchlistsService } from '../services/watchlists.service';
import { resWatchlist } from 'src/app/types/watchlist';
import { MovieItem } from 'src/app/types/movie';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    private route: ActivatedRoute,
    private watchlistsService: WatchlistsService
  ) {}

  watchlist = {} as resWatchlist;
  movieList = [] as MovieItem[];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const watchlistId = params.get('watchlistId');
      if (!watchlistId) {
        return;
      }
      this.watchlistsService.getById(watchlistId).subscribe((data) => {
        this.watchlist = data;
        this.movieList = data.movieList || [];
      });
    });
  }

  invalidForm: boolean = false;
  errorMsg: string = '';
  editWatchlist(form: NgForm) {
    
  }
  cancelHandler(form: NgForm) {
    form.setValue({ title: '', description: '' });
  }
}
