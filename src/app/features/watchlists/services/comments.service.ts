import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import { ApiWatchlistResponse, resWatchlist } from 'src/app/types/watchlist';
import { Observable, switchMap, throwError } from 'rxjs';
import { MovieItem } from 'src/app/types/movie';
import { CommentsResponse, CreateComment } from 'src/app/types/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  baseUrl = '/classes/comments';
  user: UserForAuth | undefined;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.user = this.userService.user;
  }

  createComment(title: string, comment: string, watchlistId: string) {
    const userId = this.user?.objectId;
    if (!userId) {
      return throwError(() => new Error('Invalid User'));
    }
    const commentData: CreateComment = {
      title,
      comment,
      watchlistId: {
        __type: 'Pointer',
        className: 'watchlists',
        objectId: watchlistId,
      },
      ownerId: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId,
      },
    };

    return this.apiService.postRequest(this.baseUrl, commentData);
  }

  getByWatchlistId(watchlistId:string): Observable<CommentsResponse> {
    const searchParam = `where={"watchlistId":{"__type":"Pointer","className":"watchlists","objectId":"${watchlistId}"}}`;
    return this.apiService.getRequest(`${this.baseUrl}?${searchParam}`);
  }
}
