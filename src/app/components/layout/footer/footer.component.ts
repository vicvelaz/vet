import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../../../services/app-data.interface';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  data = input.required<Footer>({});
}
