import { Component, OnInit } from '@angular/core';
import { TMDBApiService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

constructor(private tmdbApiService:TMDBApiService){}  
ngOnInit(): void {
  this.tmdbApiService.fetchMovies()
}
}
