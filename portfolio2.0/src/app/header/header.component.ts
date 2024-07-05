import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  heroHeading: string = 'I enjoy creating mobile products.';
  headings: string[] = [
    'I enjoy creating expressive UI.',
    'I enjoy creating robust backends.',
    'I enjoy solving problems.',
  ];

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
  }
}
