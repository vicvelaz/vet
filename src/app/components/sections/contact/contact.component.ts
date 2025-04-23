import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FontAwesomeModule, MatButtonModule, PhoneFormatPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly sanitizer = inject(DomSanitizer);

  data = input.required<any>({});

  icons = {
    phone: faPhone,
    email: faEnvelope,
    place: faLocationPin,
    clock: faClock,
  } as any;

  ngOnInit() {
    this.data().socialMedia.forEach((item: any) => {
      if (item.icon === 'whatsapp') {
        item.url = `https://wa.me/${item.url}?text=${encodeURIComponent(item.message)}`;
      }
      item.url = this.sanitizer.bypassSecurityTrustUrl(item.url);
    });
  }
}
