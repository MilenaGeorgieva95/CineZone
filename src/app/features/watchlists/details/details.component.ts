import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistsService } from '../services/watchlists.service';
import { resWatchlist } from 'src/app/types/watchlist';
import { MovieItem } from 'src/app/types/movie';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { CommentsService } from '../services/comments.service';
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
    title: ['', [Validators.required, Validators.minLength(3)]],
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
          console.log(data);
          
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

    const title = this.commentForm.get('title')?.value;
    const comment = this.commentForm.get('comment')?.value;

    if (title && comment) {
      this.commentsService
        .createComment(title, comment, this.watchlistId)
        .subscribe({
          next: (newComment:FullComment) => {
            console.log(newComment);
            newComment.title=title;
            newComment.comment=comment;
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
