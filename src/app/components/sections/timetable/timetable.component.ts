import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timetable',
  imports: [FontAwesomeModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss',
})
export class TimetableComponent {
  data = input.required<any>({});

  icons = {
    'fa-clock': faClock,
  } as any;
}
