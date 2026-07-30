import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBone, faCut, faHeartPulse, faShieldDog, faStethoscope, faSyringe } from '@fortawesome/free-solid-svg-icons';
import { ServicesSection } from '../../../services/app-data.interface';

@Component({
  selector: 'app-services',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  data = input.required<ServicesSection>({});
}
