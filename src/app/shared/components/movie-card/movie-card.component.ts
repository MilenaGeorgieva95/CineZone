import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie= {} as Movie;
showDetails(movieId:number){
    return `/movies/${movieId}/details`
  }
  showStars(rating:number){
    return '⭐'.repeat(rating)
  }
}
