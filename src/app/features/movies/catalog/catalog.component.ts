import { Component, OnInit } from '@angular/core';
import { TMDBApiService } from '../services/tmdb-api.service';
import { Movie, MovieResults } from 'src/app/types/movie';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  moviesList: Movie[]=[];
  isLoading:boolean=true
  constructor(private tmdbApiService: TMDBApiService) {}

  ngOnInit(): void {

    this.tmdbApiService.fetchMovies().subscribe({
      next: (res:MovieResults) => {
        this.moviesList = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error: ' + err);
      },
    });
  }
  showDetails(movieId:number){}
  showStars(rating:number){
    return '★'.repeat(rating)
  }
}
//☆