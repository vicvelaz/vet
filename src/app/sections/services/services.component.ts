import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBone, faCut, faHeartPulse, faShieldDog, faStethoscope, faSyringe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  imports: [FontAwesomeModule],
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
