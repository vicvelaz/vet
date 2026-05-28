import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { FooterComponent, HeaderComponent } from './components/layout';
import { FirebaseDataService } from './services/firebase-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly fb = inject(FirebaseDataService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly data = toSignal(this.fb.appData$, { initialValue: null });

  ngOnInit() {
    injectSpeedInsights();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          setTimeout(() => {
            document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }
      }
    });
  }
}
