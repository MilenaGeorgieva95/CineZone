import { Component, OnInit } from '@angular/core';
import { TMDBApiService } from '../services/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { fullMovieDetails } from 'src/app/types/movie';
import { ApiWatchlistResponse, resWatchlist, Watchlist } from 'src/app/types/watchlist';
import { WatchlistsService } from '../../watchlists/services/watchlists.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movieId: string = '';
  movie = {} as fullMovieDetails;
  backgroundUrl: string = 'https://image.tmdb.org/t/p/original';

  watchlists:resWatchlist[]=[]
  //{
  //   id: 123,
  //   title: 'Happy Days',
  //   description: 'sunshine',
  //   votes: ['123', '234'],
  //   movies_list: [],
  // },{
  //   id: 124,
  //   title: 'Rainy Days',
  //   description: 'sunshine',
  //   votes: ['123', '234'],
  //   movies_list: [],
  // }, {
  //   id: 125,
  //   title: 'Happy Happy Days',
  //   description: 'sunshine',
  //   votes: ['123', '234'],
  //   movies_list: [],
  // }]

  constructor(
    private tmdbApiService: TMDBApiService,
    private route: ActivatedRoute,
    private watchlistsService:WatchlistsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('movieId')!;
      this.tmdbApiService.fetchMovieById(this.movieId).subscribe((movie) => {
        this.backgroundUrl += movie.backdrop_path;
        this.movie = movie;
      });
    });
    this.watchlistsService.getByOwner().subscribe({
      next: (data:ApiWatchlistResponse)=>
        {console.log(data.results)
        
        this.watchlists=data.results||[]}
    },)
  }
  addToWatchlist(form:NgForm){
    console.log(form.value);
    
  }
}

