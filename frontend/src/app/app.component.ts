import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    HighlightsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'Suprhulk';

  constructor(private loadingService: LoadingService) {}

  isLoading: boolean = false;

  ngOnInit() {
    this.setIsLoading();
  }

  setIsLoading() {
    this.loadingService.getIsLoading$().subscribe({
      next: (res: boolean) => {
        console.log(res);
        this.isLoading = res;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        if (this.isLoading) {
        }
      },
    });
  }
}
