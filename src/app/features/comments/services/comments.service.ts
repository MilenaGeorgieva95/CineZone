import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import { map, Observable, throwError } from 'rxjs';
import { CommentsResponse, CreateComment, FullComment } from 'src/app/types/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  baseUrl = '/comments';
  user: UserForAuth | undefined;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.user = this.userService.user;
  }

  createComment( comment: string, watchlistId: string):Observable<FullComment> {
    const userId = this.user?.objectId;
    const username = this.user?.username;
    if (!userId || !username) {
      return throwError(() => new Error('Invalid User'));
    }
    const commentData: CreateComment = {
      username,
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

    return this.apiService.postRequest<FullComment>(this.baseUrl, commentData).pipe(
      map(createdComment=>({...createdComment, username, comment}))
    )
  }

  getByWatchlistId(watchlistId:string): Observable<CommentsResponse> {
    const searchParam = `where={"watchlistId":{"__type":"Pointer","className":"watchlists","objectId":"${watchlistId}"}}`;
    const orderParam = `order=-createdAt`
    return this.apiService.getRequest(`${this.baseUrl}?${searchParam}&${orderParam}`);
  }
}
