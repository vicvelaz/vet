import { Component, inject, signal } from '@angular/core';
import {
  ContactComponent,
  HeroComponent,
  InsurancesComponent,
  PromotionsComponent,
  ServicesComponent,
  TimetableComponent,
} from '../../components/sections';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServicesComponent, TimetableComponent, ContactComponent, PromotionsComponent, InsurancesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  readonly appDataService = inject(AppDataService);
  data = signal<any>(null);

  constructor() {
    this.data.set(this.appDataService.data());
  }
}
