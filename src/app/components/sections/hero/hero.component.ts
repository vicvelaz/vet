import { Component, HostListener, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HeroSection } from '../../../services/app-data.interface';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  data = input.required<HeroSection>({});
  readonly utilsService = inject(UtilsService);
  readonly sanitizer = inject(DomSanitizer);

  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
    this.data().button.primary.url = `https://wa.me/${this.data().button.primary.url}?text=${encodeURIComponent(
      this.data().button.primary.message!,
    )}`;
    this.data().button.primary.url = this.sanitizer.bypassSecurityTrustUrl(this.data().button.primary.url as string);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 900;
  }

  getContainerBackground(): string {
    return `url(img/${this.data().banner})`;
  }

  getBannerDisplay(): string {
    return 'none';
  }

  scrollToSection(sectionId: string) {
    this.utilsService.navigateToFragment(sectionId);
  }
}
