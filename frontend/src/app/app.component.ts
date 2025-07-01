import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

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

  isLoading: boolean = true;

  setIsLoading(isLoading: boolean) {
    setTimeout(() => {
      this.isLoading = isLoading;
    }, 1500);
  }
}
