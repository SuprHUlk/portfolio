import { Component } from '@angular/core';
import { HighlightsService } from '../../services/highlights.service';
import { Quote } from '../../models/quote';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-highlights',
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css',
})
export class HighlightsComponent {
  quote: Quote = { text: '', author: '' };

  constructor(
    private highlightsService: HighlightsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.highlightsService.getQuote().subscribe({
      next: (quote) => {
        console.log(quote);
        this.quote = quote;
      },
      error: (error) => {
        console.error(error);
        this.quote = {
          text: 'Really good programs live forever.',
          author: 'Charles Simonyi',
        };
        this.loadingService.decreaseLoadingCount('hi');
      },
      complete: () => {
        this.loadingService.decreaseLoadingCount('hi');
      },
    });
  }
}
