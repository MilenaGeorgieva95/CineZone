import { Component, OnInit } from '@angular/core';
import { TMDBApiService } from '../services/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { fullMovieDetails } from 'src/app/types/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movieId: string = '';
  movieDetails = {} as fullMovieDetails;

  constructor(
    private tmdbApiService: TMDBApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('movieId')!;
      this.tmdbApiService
        .fetchMovieById(this.movieId)
        .subscribe((movie) => this.movieDetails=movie);
    });
  }
}

// this.route.queryParamMap.subscribe(params => {
//   const page = params.get('page');
// });
