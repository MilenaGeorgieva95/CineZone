import { Component, OnInit } from '@angular/core';
import { TMDBApiService } from '../services/tmdb-api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { fullMovieDetails, MovieItem } from 'src/app/types/movie';
import {
  ApiWatchlistResponse,
  resWatchlist,
  Watchlist,
} from 'src/app/types/watchlist';
import { WatchlistsService } from '../../watchlists/services/watchlists.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movieId: string = '';
  movie = {} as fullMovieDetails;
  backgroundUrl: string = 'https://image.tmdb.org/t/p/original';

  watchlists: resWatchlist[] = [];
  isAuth:boolean=false;
  isLoading:boolean=false;

  constructor(
    private tmdbApiService: TMDBApiService,
    private route: ActivatedRoute,
    private watchlistsService: WatchlistsService,
    private userService:UserService,
    private router: Router
  ) {
      this.isLoggedIn$ = this.userService.isAuthSubject$$;
  }

   isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isAuth=this.userService.isAuth;
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('movieId')!;
      this.tmdbApiService.fetchMovieById(this.movieId).subscribe((movie) => {
        this.backgroundUrl += movie.backdrop_path;
        this.movie = movie;
      });
    });
    this.watchlistsService.getByOwner().subscribe({
      next: (data: ApiWatchlistResponse) => {
        console.log(data.results);

        this.watchlists = data.results || [];
      },
    });
  }
  addToWatchlist(form: NgForm) {
    this.isLoading=true;
    const watchlistId: string = form.value['watchlistSelect'];
    const newMovie: MovieItem = {
      id: this.movie.id,
      title: this.movie.title,
      vote_average: this.movie.vote_average,
      poster_path: this.movie.poster_path,
    };
    this.watchlistsService.addMovieToWatchlist(watchlistId, newMovie).subscribe(
      {next:(data)=>{
        console.log(data);
        this.isLoading=false;
        this.router.navigate(['/watchlists', watchlistId ,'details'])
      },
    error:(err)=>{
      console.log(err);
      this.isLoading=false;
    }
    }
      
    )
  }
}
