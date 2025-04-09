import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FontAwesomeModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  data = input.required<any>({});

  //TODO: Add icons to the component
  icons = {
    phone: faPhone,
    email: faEnvelope,
    place: faLocationPin,
    clock: faClock,
  } as any;
}
