import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  data = input.required<any>({});

  readonly sanitizer = inject(DomSanitizer);
  readonly utilsService = inject(UtilsService);
  menuOpen = false;

  ngOnInit() {
    this.data().button.url = `https://wa.me/${this.data().button.url}?text=${encodeURIComponent(this.data().button.message)}`;
    this.data().button.url = this.sanitizer.bypassSecurityTrustUrl(this.data().button.url);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(sectionId: string) {
    this.utilsService.navigateToFragment(sectionId);
  }
}
