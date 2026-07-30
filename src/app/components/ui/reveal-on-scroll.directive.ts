import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() direction: RevealDirection = 'up';
  @Input() delay = 0;
  @Input() once = true;
  @Input() threshold = 0.2;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'reveal');
    this.renderer.addClass(host, `reveal--${this.direction}`);
    this.renderer.setStyle(host, 'transition-delay', `${this.delay}s`);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.renderer.addClass(host, 'reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(host, 'reveal--visible');
          if (this.once) this.observer?.unobserve(host);
        } else if (!this.once) {
          this.renderer.removeClass(host, 'reveal--visible');
        }
      },
      { threshold: this.threshold },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
