import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private watchlistsService: WatchlistsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  movieList = [] as MovieItem[];
  watchlistId: string = '';
  errorMsg: string = ''

  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.watchlistId = params.get('watchlistId') || '';
      if (!this.watchlistId) {
        return;
      }
      this.watchlistsService.getById(this.watchlistId).subscribe({
        next: (data: resWatchlist) => {
          this.errorMsg=''
          this.movieList = data.movieList || [];
          this.editForm.setValue({
            title: data.title,
            description: data.description,
          });
        },
        error: (err)=>{
           console.error("Edit failed:", err)
        }
      });
    });
  }

  editWatchlist(): void {
    if (this.editForm.invalid) {
      return;
    }

    const title = this.editForm.get('title')?.value;
    const description = this.editForm.get('description')?.value;

    if (title && description) {
      this.watchlistsService
        .editWatchlist(this.watchlistId, title, description)
        .subscribe((data) => console.log(data));
    }
    this.router.navigate(['/watchlists']);
  }
  cancelHandler() {
    this.editForm.setValue({
      title: '',
      description: '',
    });
    this.router.navigate(['/watchlists']);
  }
}
