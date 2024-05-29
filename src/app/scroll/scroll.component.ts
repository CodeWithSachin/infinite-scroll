import { Component, ElementRef, Input, QueryList, Renderer2, ViewChildren, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.css'
})
export class ScrollComponent {
  name = 'CodeWithSachin';
  @Input({ required: true }) scrollTo: 'top' | 'bottom' = 'bottom';
  @Input({ required: true }) loopList: any = [];
  @ViewChildren('loopItem') loopItems!: QueryList<ElementRef>;
  sanitizer = inject(DomSanitizer);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.startAnimation();
  }

  startAnimation() {
    const animationName =
      this.scrollTo === 'top' ? 'scrollTop' : 'scrollBottom';

    this.loopItems.forEach((loopItem, index) => {
      const delay =
        (40 / this.loopList.length) * (this.loopList.length - (index + 1)) * -1;
      this.renderer.setStyle(
        loopItem.nativeElement,
        this.scrollTo,
        `max(calc(150px * ${this.loopList.length}), 100%)`
      );
      this.renderer.setStyle(
        loopItem.nativeElement,
        'animationName',
        animationName
      );
      this.renderer.setStyle(
        loopItem.nativeElement,
        'animationDelay',
        `${delay}s`
      );
    });
  }
  getSanitize(sanitize: any) {
    return this.sanitizer.bypassSecurityTrustHtml(sanitize);
  }
}
