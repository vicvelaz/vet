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
import { APP_DEFAULTS } from '../../services/app-data.service';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServicesComponent, TimetableComponent, ContactComponent, PromotionsComponent, InsurancesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  private readonly sanityService = inject(SanityService);
  data = toSignal(this.sanityService.appData$, { initialValue: APP_DEFAULTS });

  ngOnInit() {
    this.sanityService.appData$.subscribe((data) => {
      console.log('[HomeComponent] appData$ subscription active, data:', data);
    });
  }
}
