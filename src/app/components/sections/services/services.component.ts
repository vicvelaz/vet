import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ServicesSection } from '../../../services/app-data.interface';
import { RevealOnScrollDirective } from '../../ui/reveal-on-scroll.directive';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  data = input.required<ServicesSection>({});

  iconClass(icon: string): string {
    const legacyIcons: Record<string, string> = {
      stethoscope: 'fa-stethoscope',
      syringe: 'fa-syringe',
      bone: 'fa-bone',
      heartPulse: 'fa-heart-pulse',
      faCut: 'fa-scissors',
      'shield-dog': 'fa-shield-heart',
    };

    return legacyIcons[icon] ?? icon;
  }
}
