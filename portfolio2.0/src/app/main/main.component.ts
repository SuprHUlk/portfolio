import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';

import '@material/web/button/filled-button'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/divider/divider'
import '@material/web/ripple/ripple'
import '@material/web/button/text-button'
import '@material/web/button/filled-button'


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AboutComponent, SkillsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainComponent {

  constructor(private ref: ElementRef) {}

  menuOpenRef: any;
  menuCloseRef: any;
  pagesRef: any;
  pageChild: any;

  // @HostListener('window:resize')
  // onResize() {
  //   this.onScreenChange();
  // }

  ngOnInit() {
    this.menuOpenRef = this.ref.nativeElement.querySelector('#menu-open');
    this.menuCloseRef = this.ref.nativeElement.querySelector('#menu-close');

    this.pagesRef = this.ref.nativeElement.querySelector('.pages');
    this.pageChild = this.pagesRef.childNodes;

    this.setPagePosition();
    console.log(this.pageChild[1].style.top);
  }

  setPagePosition() {
    let idx = 0;
    this.pageChild.forEach((element: { style: { top: string; }; }) => {
      element.style.top = idx++ * 100 + 'vw';
    });
  }

  pageChange(tarPage: string) {
    const curPage = this.ref.nativeElement.querySelector('.current-page');
    const tarPageRef = this.ref.nativeElement.querySelector('.'+tarPage);
    const translateBy = tarPageRef.style.top;

    this.pagesRef.style.transform = 'translateY(-'+translateBy+')';

    curPage.classList.remove('current-panel');
    tarPageRef.classList.add('current-panel');
  }

  toggleMenu(isOpen: boolean) {
    if(isOpen) {
      this.menuOpenRef.style.display = 'none';
      this.menuCloseRef.style.display = 'block';
    }
    else {
      this.menuOpenRef.style.display = 'block';
      this.menuCloseRef.style.display = 'none';
    }
  }

  // onScreenChange() {
  //   if(window.innerWidth > 1400) {
  //     this.menuOpenRef.style.display = 'none';
  //     this.menuCloseRef.style.display = 'none';
  //   }
  //   else {
  //     this.menuOpenRef.style.display = 'block';
  //   }
  // }

}
