import { Component } from '@angular/core';
import { WatchlistsService } from '../services/watchlists.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(
    private watchlistsService: WatchlistsService,
    private router: Router
  ) {}
  createWatchlist(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { title, description } = form?.value;
    if (title && description) {
      try {
        this.watchlistsService
          .createWatchlist(title, description)
          .subscribe((data) => console.log(data));

        form.setValue({ title: '', description: '' });
        this.router.navigate(['/']);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
