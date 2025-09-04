import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import { map, Observable, throwError } from 'rxjs';
import {
  CommentsResponse,
  CreateComment,
  FullComment,
  likeCommentRes,
  likeCommentResWithId,
} from 'src/app/types/comment';

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

  createComment(comment: string, watchlistId: string): Observable<FullComment> {
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
      likes: [],
    };

    return this.apiService
      .postRequest<FullComment>(this.baseUrl, commentData)
      .pipe(
        map((createdComment) => ({
          ...createdComment,
          username,
          comment,
          ownerId: {
            __type: 'Pointer',
            className: '_User',
            objectId: userId,
          },
          watchlistId: {
            __type: 'Pointer',
            className: 'watchlists',
            objectId: watchlistId,
          },
          likes: [],
        }))
      );
  }

  getByWatchlistId(watchlistId: string): Observable<CommentsResponse> {
    const searchParam = `where={"watchlistId":{"__type":"Pointer","className":"watchlists","objectId":"${watchlistId}"}}`;
    const orderParam = `order=-createdAt`;
    return this.apiService.getRequest(
      `${this.baseUrl}?${searchParam}&${orderParam}`
    );
  }
  deleteById(commentId: string) {
    return this.apiService.delRequest(`${this.baseUrl}/${commentId}`);
  }

  addLike(commentId: string, currentUserId: string): Observable<likeCommentResWithId> {
    const body = {
      likes: {
        "__op": "AddUnique",
        "objects": [currentUserId]
      }
    };
    return this.apiService.putRequest<likeCommentResWithId>(`${this.baseUrl}/${commentId}`, body).pipe(
      map(res => ({ ...res, objectId: commentId }))
    )
  }

    removeLike(commentId: string, currentUserId: string): Observable<likeCommentResWithId> {
    const body = {
      likes: {
        "__op": "Remove",
        "objects": [currentUserId]
      }
    };
    return this.apiService.putRequest<likeCommentResWithId>(`${this.baseUrl}/${commentId}`, body).pipe(
      map(res => ({ ...res, objectId: commentId }))
    )
  }
}
