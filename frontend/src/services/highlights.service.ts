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
      .get<any>(
        'https://raw.githubusercontent.com/mudroljub/programming-quotes-api/master/Data/quotes.json'
      )
      .pipe(map((data: any) => this.selectQuote(data)));
  }

  selectQuote(data: any): Quote {
    const quote = data[Math.floor(Math.random() * data.length)];
    if (quote.en.length > 60) {
      return this.selectQuote(data);
    }
    return quote;
  }
}
