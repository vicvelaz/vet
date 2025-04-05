import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
