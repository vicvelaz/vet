import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-location',
  imports: [FontAwesomeModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  data = input.required<any>({});

  //TODO: Add icons to the component
  icons = {
    // 'fa-clock': faClock,
  } as any;
}
