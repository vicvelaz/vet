import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { Header } from '../../../services/app-data.interface';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    console.log(this.data());
    this.data().button.url = `https://wa.me/${this.data().button.url}?text=${encodeURIComponent(this.data().button.message!)}`;
    this.data().button.url = this.sanitizer.bypassSecurityTrustUrl(this.data().button.url as string);
    console.log(this.data());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(sectionId: string) {
    this.utilsService.navigateToFragment(sectionId);
  }
}
