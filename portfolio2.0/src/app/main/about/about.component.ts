import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@material/web/button/outlined-button'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent {

}