import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
    private userService: UserService,
    private commentsService: CommentsService
  ) {
    this.isLoggedIn$ = this.userService.isAuthSubject$$;
  }

  isLoggedIn$: Observable<boolean>;
  currentUserId: string = '';
  movieList = [] as MovieItem[];
  watchlistId: string = '';
  watchlist = {} as resWatchlist;
  errorMsg: string = '';
  loading: boolean = false;

  commentsList: FullComment[] = [];
  commentErrMsg: string = '';
  commentLoading: boolean = false;

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
      this.currentUserId = this.userService.userId;
    });
  }

  postComment(): void {
    if (this.commentForm.invalid) {
      return;
    }

    const comment = this.commentForm.get('comment')?.value;

    if (comment) {
      this.commentsService.createComment(comment, this.watchlistId).subscribe({
        next: (newComment: FullComment) => {
          this.commentsList.unshift(newComment);
          this.commentForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteCommentHandler(comment: FullComment) {
    if (this.currentUserId !== comment.ownerId.objectId) {
      return;
    }
    const choice = confirm('Are you sure you want to delete the comment?');
    if (choice) {
      this.commentsService.deleteById(comment.objectId).subscribe({
        next: () => {
          this.commentsList = this.commentsList.filter(
            (el) => el.objectId !== comment.objectId
          );
        },
        error: (err) => console.log(err),
      });
    }
  }
  likeCommentHandler(comment: FullComment) {
    if (
      !this.currentUserId ||
      comment.ownerId.objectId === this.currentUserId
    ) {
      return;
    }
    this.commentsService
      .addLike(comment.objectId, this.currentUserId)
      .subscribe({
        next: (data) => {
          const likedComment = this.commentsList.find(
            (el) => el.objectId === data.objectId
          );
          if (likedComment) {
            likedComment.likes.push(this.currentUserId);
          }
        },
        error: (err) => console.log(err),
      });
  }
  dislikeCommentHandler(comment: FullComment) {
    if (
      !this.currentUserId ||
      comment.ownerId.objectId === this.currentUserId
    ) {
      return;
    }

    this.commentsService
      .removeLike(comment.objectId, this.currentUserId)
      .subscribe({
        next: (data) => {
          const dislikedComment = this.commentsList.find(
            (el) => el.objectId === data.objectId
          );
          if (dislikedComment) {
            dislikedComment.likes=dislikedComment.likes.filter(id=>id!==this.currentUserId);
          }
        },
        error: (err) => console.log(err),
      });
  }
}
