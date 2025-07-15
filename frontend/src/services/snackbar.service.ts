import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbars$ = new BehaviorSubject<string[]>([]);

  constructor() {}

  setSnackBar(message: string): void {
    this.snackbars$.next([message, ...this.snackbars$.getValue()]);
  }

  getSnackBar$(): Observable<string[]> {
    return this.snackbars$.asObservable();
  }
}
