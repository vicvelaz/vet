import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location',
  imports: [FontAwesomeModule, MatButtonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  data = input.required<any>({});

  icons = {
    place: faLocationPin,
    phone: faPhone,
  } as any;
}
