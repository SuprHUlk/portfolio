import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  readonly projectsList = [
    {
      title: 'ChatFlora',
      number: '03',
      img: 'chatFlora.gif',
      link: 'https://chatflora.suprhulk.com/',
    },
    {
      title: 'GradientOS',
      number: '02',
      img: 'gradientOS.gif',
      link: 'https://gradientos.suprhulk.com/',
    },

    {
      title: 'TerminalGPT',
      number: '01',
      img: 'terminalGPT.gif',
      link: 'https://github.com/SuprHUlk/chatGPTFromTerminal',
    },
    { title: 'Project LIVE', number: '00', img: 'comingSoon.jpg', link: '' },
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
        this.imgCont.querySelector('img').src =
          this.projectsList[
            this.projectsList.length - parseInt(event.target.id) - 1
          ].img;
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
