import { inject, Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import { catchError, from, map, Observable, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppData } from './app-data.interface';
import { AppDataService } from './app-data.service';
import { UtilsService } from './utils.service';

interface SanityContent {
  warning?: string | null;
  logo?: string | null;
  heroBanner?: string | null;
  services?: AppData['sections']['services']['items'] | null;
  timetable?: AppData['sections']['timetable']['items'] | null;
  contact?: Pick<AppData['sections']['contact'], 'items' | 'socialMedia'> | null;
  promotions?: AppData['sections']['promotions']['items'] | null;
  insurances?: AppData['sections']['insurances']['items'] | null;
  reviews?: AppData['sections']['reviews']['items'] | null;
}

const SANITY_QUERY = `{
  "warning":     *[_type == "appConfig"][0].warning,
  "logo":        *[_type == "appConfig"][0].logo.asset->url,
  "heroBanner":  *[_type == "hero"][0].banner,
  "services":    *[_type == "servicesSection"][0].items,
  "timetable":   *[_type == "timetableSection"][0].items,
  "contact":     *[_type == "contactSection"][0]{ items, socialMedia },
  "promotions":  *[_type == "promotionsSection"][0].items,
  "insurances":  *[_type == "insurancesSection"][0].items,
  "reviews":     *[_type == "review" && published == true]{ author, rating, text, date },
}`;

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly appDataService = inject(AppDataService);
  private readonly utilsService = inject(UtilsService);
  private readonly client = createClient(environment.sanity);

  // Solo consulta lo dinámico
  readonly dynamicContent$: Observable<SanityContent> = from(this.client.fetch<SanityContent>(SANITY_QUERY));

  // Merge de defaults + Sanity
  readonly appData$: Observable<AppData> = this.dynamicContent$.pipe(
    // tap((sanity) => console.log('[SanityService] Raw data from Sanity:', sanity)),
    map((sanity) => this.utilsService.mergeWithDefaults(this.appDataService.data(), sanity)),
    // tap((merged) => console.log('[SanityService] Merged app data:', merged)),
    catchError((err) => {
      console.error('[SanityService] Error fetching from Sanity, using defaults:', err);
      return of(this.appDataService.data());
    }),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
}
