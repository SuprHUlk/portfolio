import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingService } from '../services/loading.service';
import { SnackbarService } from '../services/snackbar.service';

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

  constructor(
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {}

  isLoading: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessage: string = '';

  ngOnInit() {
    this.setIsLoading();
    this.setSnackbar();
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

  setSnackbar() {
    this.snackbarService.getSnackBar$().subscribe({
      next: (res: string[]) => {
        if (res.length && res[0].length) {
          this.showSnackbar = true;
          this.snackbarMessage = res[0];
          setTimeout(() => {
            this.showSnackbar = false;
          }, 5000);
        }
      },
    });
  }
}
