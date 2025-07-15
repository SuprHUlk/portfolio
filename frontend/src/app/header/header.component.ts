import { Component, CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Activity, Type, TypeValues } from '../../models/activity';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  headings: string[] = [
    'I enjoy creating intuitive UI.',
    'I enjoy creating robust backends.',
    'I enjoy solving problems.',
  ];
  heroHeading: string = '';

  activity: Activity | null = null;
  Type = Type;
  TypeValues = TypeValues;

  constructor(
    private activityService: ActivityService,
    private loadingService: LoadingService,
    private renderer: Renderer2
  ) {}

  launchEmoji() {
    const container = document.querySelector(
      '.activity.section'
    ) as HTMLElement;

    if (!container || !this.activity) return;

    const emoji = this.renderer.createElement('img');
    this.renderer.addClass(emoji, 'emoji');

    emoji.src = TypeValues[this.activity.type];

    // Get container width and generate random pixel offset
    const containerWidth = container.offsetWidth;
    const randomLeft = Math.random() * containerWidth;

    // Apply pixel-based offset and size to the emoji element
    emoji.style.position = 'absolute';
    emoji.style.left = `${randomLeft}px`;
    emoji.style.width = `${20 + Math.random() * 16}px`;
    emoji.style.height = `${20 + Math.random() * 16}px`;

    this.renderer.appendChild(container, emoji);

    setTimeout(() => {
      if (container.contains(emoji)) {
        this.renderer.removeChild(container, emoji);
      }
    }, 2000);
  }

  startFloatingEmojis() {
    setInterval(() => {
      this.launchEmoji();
    }, Math.random() * 400 + 300); // every 300–700ms
  }

  ngOnInit() {
    let idx = 0;

    const typeHeading = (heading: string, callback: () => void) => {
      let iteration = 0;
      const interval = setInterval(() => {
        this.heroHeading =
          'I enjoy ' +
          heading
            .substring(7)
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return heading[index + 7];
              }
              return ' ';
            })
            .join('');

        if (iteration >= heading.length - 7) {
          clearInterval(interval);
          setTimeout(callback, 5000);
        }
        iteration++;
      }, 30);
    };

    const deleteHeading = (callback: () => void) => {
      let iteration = this.heroHeading.length - 8;
      const interval = setInterval(() => {
        this.heroHeading =
          'I enjoy ' +
          this.heroHeading
            .substring(8)
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return this.headings[idx][index + 7];
              }
              return ' ';
            })
            .join('');

        if (iteration < 0) {
          clearInterval(interval);
          callback();
        }
        iteration--;
      }, 30);
    };

    const cycleHeadings = () => {
      typeHeading(this.headings[idx], () => {
        deleteHeading(() => {
          idx = (idx + 1) % this.headings.length;
          cycleHeadings();
        });
      });
    };

    cycleHeadings();

    this.activityService.getActivity().subscribe({
      next: (res: Activity) => {
        console.log(res);
        this.activity = res;
        this.loadingService.decreaseLoadingCount('header');
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('header1');
      },
    });

    this.startFloatingEmojis();
  }
}
