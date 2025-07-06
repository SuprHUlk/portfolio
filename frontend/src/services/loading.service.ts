import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  loadingCount: number = 3;
  isLoading$ = new BehaviorSubject<boolean>(false);

  decreaseLoadingCount(s: any) {
    this.loadingCount--;
    console.log(this.loadingCount);
    console.log(s);
    if (this.loadingCount <= 0) {
      this.isLoading$.next(true);
    }
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
