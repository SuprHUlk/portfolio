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
    return this.http
      .get<any>('https://backend-62924394999.asia-south1.run.app/getQuote')
      .pipe(map((data: any) => this.selectQuote(data)));
  }

  selectQuote(data: any): Quote {
    const quote = data[Math.floor(Math.random() * data.length)];
    if (quote.text.length > 60) {
      return this.selectQuote(data);
    }
    return quote;
  }
}
