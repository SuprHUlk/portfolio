import { Component, EventEmitter, Output } from '@angular/core';
import { HighlightsService } from '../../services/highlights.service';
import { Quote } from '../../models/quote';

@Component({
    selector: 'app-highlights',
    imports: [],
    templateUrl: './highlights.component.html',
    styleUrl: './highlights.component.css'
})
export class HighlightsComponent {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  quote: Quote = { en: '', author: '', id: 0 };

  constructor(private highlightsService: HighlightsService) {}

  ngOnInit() {
    this.highlightsService.getQuote().subscribe({
      next: (quote) => {
        this.quote = quote;
      },
      error: (error) => {
        this.quote = {
          en: 'Really good programs live forever.',
          author: 'Charles Simonyi',
          id: 0,
        };
        this.isLoading.emit(true);
      },
      complete: () => {
        this.isLoading.emit(true);
      },
    });
  }
}
