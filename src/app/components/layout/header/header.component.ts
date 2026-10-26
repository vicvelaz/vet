import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, input, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { Header } from '../../../services/app-data.interface';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  data = input.required<Header>({});

  readonly sanitizer = inject(DomSanitizer);
  readonly utilsService = inject(UtilsService);
  menuOpen = false;
  scrolled = signal(false);
  hidden = signal(false);
  private isMobile = false;
  private lastScrollY = 0;

  @ViewChild('firstMobileLink') firstMobileLink?: ElementRef<HTMLAnchorElement>;
  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY = window.scrollY;
    this.scrolled.set(currentScrollY > 20);

    if (!this.isMobile || this.menuOpen || currentScrollY <= 20) {
      this.hidden.set(false);
    } else {
      this.hidden.set(currentScrollY > this.lastScrollY);
    }

    this.lastScrollY = currentScrollY;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewportMode();
  }

  ngOnInit() {
    this.updateViewportMode();
    this.data().button.url = `https://wa.me/${this.data().button.url}?text=${encodeURIComponent(this.data().button.message!)}`;
    this.data().button.url = this.sanitizer.bypassSecurityTrustUrl(this.data().button.url as string);
    this.data().logo = this.utilsService.resolveDialogImageSource(this.data().logo) ?? '';
  }

  private updateViewportMode(): void {
    this.isMobile = window.innerWidth <= 900;

    if (!this.isMobile) {
      this.hidden.set(false);
      this.menuOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.hidden.set(false);

    if (this.menuOpen) {
      setTimeout(() => this.firstMobileLink?.nativeElement.focus());
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  closeMenu() {
    this.menuOpen = false;

    setTimeout(() => this.menuToggle?.nativeElement.focus());
  }

  scrollToSection(sectionId: string) {
    this.closeMenu();
    this.utilsService.navigateToFragment(sectionId);
  }
}
