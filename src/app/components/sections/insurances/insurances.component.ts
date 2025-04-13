import { Component, input } from '@angular/core';

@Component({
  selector: 'app-insurances',
  imports: [],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss',
})
export class InsurancesComponent {
  data = input.required<any>({});
}
