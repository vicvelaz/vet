import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBolt, faBone, faCut, faHeartPulse, faShieldDog, faStethoscope, faSyringe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  imports: [MatIconModule, FontAwesomeModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  data = input.required<any>({});

  icons = {
    stethoscope: faStethoscope,
    syringe: faSyringe,
    bone: faBone,
    heartPulse: faHeartPulse,
    faCut: faCut,
    'shield-dog': faShieldDog,
  } as any;
}
