import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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

  readonly utilsService = inject(UtilsService);
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(sectionId: string) {
    this.utilsService.scrollToSection(sectionId);
  }
}
