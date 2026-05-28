import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ContactComponent,
  HeroComponent,
  InsurancesComponent,
  PromotionsComponent,
  ServicesComponent,
  TimetableComponent,
} from '../../components/sections';
import { FirebaseDataService } from '../../services/firebase-data.service';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServicesComponent, TimetableComponent, ContactComponent, PromotionsComponent, InsurancesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  private readonly fb = inject(FirebaseDataService);
  readonly data = toSignal(this.fb.appData$, { initialValue: null });
}
