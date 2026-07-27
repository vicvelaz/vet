import { inject, Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import { catchError, from, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppData } from './app-data.interface';
import { APP_DEFAULTS } from './app-data.service';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly utilsService = inject(UtilsService);
  private client = createClient(environment.sanity);

  // Solo consulta lo dinámico
  readonly dynamicContent$: Observable<Partial<AppData>> = from(
    this.client.fetch(`{
      "warning":          *[_type == "appConfig"][0].warning,
      "logo":             *[_type == "appConfig"][0].logo.asset->url,
      "heroBanner":       *[_type == "hero"][0].banner,
      "services":         *[_type == "servicesSection"][0].items,
      "timetable":        *[_type == "timetableSection"][0].items,
      "contact":          *[_type == "contactSection"][0]{ items, socialMedia },
      "promotions":       *[_type == "promotionsSection"][0].items,
      "insurances":       *[_type == "insurancesSection"][0].items,
    }`),
  );

  // Merge de defaults + Sanity
  readonly appData$: Observable<AppData> = this.dynamicContent$.pipe(
    tap((sanity) => console.log('[SanityService] Raw data from Sanity:', sanity)),
    map((sanity) => this.utilsService.mergeWithDefaults(APP_DEFAULTS, sanity)),
    tap((merged) => console.log('[SanityService] Merged app data:', merged)),
    catchError((err) => {
      console.error('[SanityService] Error fetching from Sanity, using defaults:', err);
      return of(APP_DEFAULTS);
    }),
    shareReplay(1),
  );
}
