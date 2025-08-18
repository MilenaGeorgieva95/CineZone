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
  errorMsg: string = '';
  invalidForm: boolean = false;
  createWatchlist(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.errorMsg = '';
    const { title, description } = form?.value;
    if (title && description) {
      this.watchlistsService.createWatchlist(title, description).subscribe({
        next: (data) => {
          console.log(data);
          form.setValue({ title: '', description: '' });
          this.router.navigate(['/watchlists']);
        },
        error: (err) => {
          this.errorMsg = err.error?.message || err.message;
          this.invalidForm = true;
        },
      });
    }
  }
  cancelHandler(form: NgForm) {
    form.setValue({ title: '', description: '' });
  }
}
