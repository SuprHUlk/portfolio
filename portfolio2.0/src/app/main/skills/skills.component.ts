import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@material/web/button/outlined-button'

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent {

}
