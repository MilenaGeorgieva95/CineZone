import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistsService } from '../services/watchlists.service';
import { resWatchlist } from 'src/app/types/watchlist';
import { MovieItem } from 'src/app/types/movie';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { CommentsService } from '../../comments/services/comments.service';
import { CommentsResponse, FullComment } from 'src/app/types/comment'; 

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private watchlistsService: WatchlistsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private commentsService: CommentsService
  ) {
    this.isLoggedIn$ = this.userService.isAuthSubject$$;
  }

  isLoggedIn$: Observable<boolean>;

  movieList = [] as MovieItem[];
  watchlistId: string = '';
  watchlist = {} as resWatchlist;
  errorMsg: string = '';
  loading: boolean = false;

  commentsList: FullComment[]=[]
  commentErrMsg:string=''
  commentLoading: boolean=false;

  commentForm = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.watchlistId = params.get('watchlistId') || '';
      if (!this.watchlistId) {
        return;
      }
      this.watchlistsService.getById(this.watchlistId).subscribe({
        next: (data: resWatchlist) => {
          this.errorMsg = '';
          this.watchlist = data;
          this.movieList = data.movieList || [];
        },
        error: (err) => {
          console.error('Movie list fetch failed:', err);
        },
      });
      this.commentsService.getByWatchlistId(this.watchlistId).subscribe({
        next: (data: CommentsResponse) => {
          this.commentErrMsg = '';
          this.commentsList = data.results || [];          
        },
        error: (err) => {
          console.error('Posting comment failed:', err);
        },
      });

    });
  }

  postComment(): void {
    if (this.commentForm.invalid) {
      return;
    }

    const comment = this.commentForm.get('comment')?.value;

    if (comment) {
      this.commentsService
        .createComment(comment, this.watchlistId)
        .subscribe({
          next: (newComment:FullComment) => {
            console.log(newComment);
            this.commentsList.push(newComment)
            this.commentForm.reset()
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
