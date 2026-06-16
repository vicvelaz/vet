import { inject, Injectable } from "@angular/core";
import { Observable, from, map, catchError, of, shareReplay } from "rxjs";
import { AppData } from "./app-data.interface";
import { APP_DEFAULTS } from "./app-data.service";
import { UtilsService } from "./utils.service";

@Injectable({ providedIn: 'root' })
export class SanityService {
    private readonly utilsService = inject(UtilsService);
  private client = createClient({ ... });

  // Solo consulta lo dinámico
  readonly dynamicContent$: Observable<Partial<AppData>> = from(
    this.client.fetch(`{
      "headerWarning":    *[_type == "header"][0].warning,
      "heroBanner":       *[_type == "hero"][0].banner,
      "services":         *[_type == "servicesSection"][0].items,
      "timetable":        *[_type == "timetableSection"][0].items,
      "contact":          *[_type == "contactSection"][0]{ items, socialMedia },
      "promotions":       *[_type == "promotionsSection"][0].items,
      "insurances":       *[_type == "insurancesSection"][0].items,
    }`)
  );

  // Merge de defaults + Sanity
  readonly appData$: Observable<AppData> = this.dynamicContent$.pipe(
    map((sanity) => this.utilsService.mergeWithDefaults(APP_DEFAULTS, sanity)),
    catchError(() => of(APP_DEFAULTS)), // si Sanity falla, usa defaults
    shareReplay(1),
  );
}