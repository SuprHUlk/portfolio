import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class HighlightsService {
  constructor(private http: HttpClient) {}

  getQuote(): Observable<Quote> {
    return this.http.get<Quote>(
      'https://backend-62924394999.asia-south1.run.app/getQuote'
    );
  }
}
