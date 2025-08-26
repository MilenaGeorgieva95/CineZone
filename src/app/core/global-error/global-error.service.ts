import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {
private apiError$$ = new BehaviorSubject(null);
public apiError$=this.apiError$$.asObservable();

setError(error:any):void {
  this.apiError$$.next(error);
}
}
