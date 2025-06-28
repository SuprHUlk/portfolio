import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  readonly projectsList = [
    { title: 'Gradient OS', number: '03', link: '1.gif' },
    { title: 'Project LIVE', number: '02', link: '1.gif' },
    { title: 'ChatFlora', number: '01', link: '1.gif' },
  ];

  projectList: any[] = [];
  imgCont: any = null;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.projectList = this.elRef.nativeElement.querySelectorAll('.project');
    this.imgCont = this.elRef.nativeElement.querySelector('.img-cont');

    this.projectList.forEach((project: any) => {
      this.addMouseOverEvent(project);
      this.addMouseOutEvent(project);
    });
  }

  addMouseOverEvent(element: any) {
    this.renderer.listen(element, 'mouseover', (event) => {
      console.log(getComputedStyle(this.imgCont).top);

      this.renderer.setStyle(this.imgCont, 'top', '0');

      this.renderer.setStyle(
        this.imgCont,
        'top',
        'calc(' +
          element.getBoundingClientRect().top +
          'px + ' +
          getComputedStyle(this.imgCont).top +
          ')'
      );

      this.projectList.forEach((project: any) => {
        if (project !== element) {
          project.classList.add('dim');
        }
        element.classList.remove('dim');
        element.classList.add('highlight-item');

        this.renderer.setStyle(this.imgCont, 'opacity', '1');
        this.renderer.setStyle(this.imgCont, 'filter', 'blur(0px)');
        this.imgCont.classList.remove('show');
        setTimeout(() => {
          this.imgCont.classList.add('show');
        }, 1);
      });
    });
  }

  addMouseOutEvent(element: any) {
    this.renderer.listen(element, 'mouseout', (event) => {
      this.projectList.forEach((project: any) => {
        project.classList.remove('dim');
      });
      element.classList.remove('highlight-item');
      this.renderer.setStyle(this.imgCont, 'opacity', '0');
      this.renderer.setStyle(this.imgCont, 'filter', 'blur(5px)');
    });
  }
}
