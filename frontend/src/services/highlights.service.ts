import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Quote } from '../models/quote';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HighlightsService {
  private readonly baseApiUrl = environment.basApiUrl;
  constructor(private http: HttpClient) {}

  getQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.baseApiUrl + '/getQuote');
  }
}
