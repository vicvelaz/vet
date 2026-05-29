import { Component, inject, signal } from '@angular/core';
import {
  ContactComponent,
  HeroComponent,
  InsurancesComponent,
  PromotionsComponent,
  ServicesComponent,
  TimetableComponent,
} from '../../components/sections';
import { AppData } from '../../services/app-data.interface';
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
  data = signal<AppData>({} as AppData);

  constructor() {
    this.data.set(this.appDataService.data());
  }
}
