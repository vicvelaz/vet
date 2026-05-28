import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { catchError, combineLatest, map, of, shareReplay } from 'rxjs';
import type { Observable } from 'rxjs';
import type {
  AppData,
  Contact,
  Footer,
  Header,
  Hero,
  Insurances,
  Promotions,
  Services,
  Timetable,
} from '../models/app-data.model';

/**
 * Firestore structure expected by this service:
 *
 * Collection: app-content
 * ├── Document: header      → Header
 * ├── Document: footer      → Footer
 * ├── Document: hero        → Hero
 * ├── Document: services    → Services
 * ├── Document: timetable   → Timetable
 * ├── Document: contact     → Contact
 * ├── Document: promotions  → Promotions
 * └── Document: insurances  → Insurances
 */

const COLLECTION = 'app-content';

@Injectable({ providedIn: 'root' })
export class FirebaseDataService {
  private readonly firestore = inject(Firestore);

  // ── Private helper ────────────────────────────────────────────────────────

  private getDoc<T>(docId: string): Observable<T> {
    const ref = doc(this.firestore, COLLECTION, docId);
    return (docData(ref) as Observable<T | undefined>).pipe(
      map((data) => data ?? ({} as T)),
      catchError(() => of({} as T)),
      shareReplay(1),
    );
  }

  // ── Public streams (lazy, cached) ─────────────────────────────────────────

  readonly header$ = this.getDoc<Header>('header');
  readonly footer$ = this.getDoc<Footer>('footer');
  readonly hero$ = this.getDoc<Hero>('hero');
  readonly services$ = this.getDoc<Services>('services');
  readonly timetable$ = this.getDoc<Timetable>('timetable');
  readonly contact$ = this.getDoc<Contact>('contact');
  readonly promotions$ = this.getDoc<Promotions>('promotions');
  readonly insurances$ = this.getDoc<Insurances>('insurances');

  /**
   * Combines all sections into a single AppData observable.
   * Emits once all Firestore reads have resolved.
   */
  readonly appData$: Observable<AppData> = combineLatest([
    this.header$,
    this.hero$,
    this.services$,
    this.timetable$,
    this.contact$,
    this.promotions$,
    this.insurances$,
    this.footer$,
  ]).pipe(
    map(([header, hero, services, timetable, contact, promotions, insurances, footer]) => ({
      header,
      sections: { hero, services, timetable, contact, promotions, insurances },
      footer,
    })),
    shareReplay(1),
  );
}
