import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HighlightsComponent,
    ProjectsComponent,
  ],
})
export class AppComponent {
  title = 'Suprhulk';

  isLoading: boolean = true;

  setIsLoading(isLoading: boolean) {
    setTimeout(() => {
      this.isLoading = isLoading;
    }, 1500);
  }
}
