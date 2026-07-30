import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';
import { ContactSection, SocialMediaItem } from '../../../services/app-data.interface';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FontAwesomeModule, MatButtonModule, PhoneFormatPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly sanitizer = inject(DomSanitizer);

  data = input.required<ContactSection>({});

  constructor() {
    effect(() => {
      this.data().socialMedia?.forEach((item: SocialMediaItem) => {
        if (item.icon.includes('whatsapp')) {
          item.url = `https://wa.me/${item.url}?text=${encodeURIComponent(item.message!)}`;
        }
        // item.url = this.sanitizer.bypassSecurityTrustUrl(item.url as string);
      });
    });
  }

  isPhoneNumber(value: string) {
    return /^[\+]?[0-9]{10,15}$/.test(value);
  }

  isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
