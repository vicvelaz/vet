import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { TimetableSection } from '../../../services/app-data.interface';
import { RevealOnScrollDirective } from '../../ui/reveal-on-scroll.directive';

@Component({
  selector: 'app-timetable',
  imports: [FontAwesomeModule, RevealOnScrollDirective],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss',
})
export class TimetableComponent {
  data = input.required<TimetableSection>({});

  icons = {
    'fa-clock': faClock,
  } as any;
}
