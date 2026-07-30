import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent, HeaderComponent } from './components/layout';
import { APP_DEFAULTS } from './services/app-data.service';
import { SanityService } from './services/sanity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly sanityService = inject(SanityService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  data = toSignal(this.sanityService.appData$, { initialValue: APP_DEFAULTS });
  warningDismissed = signal(false);

  dismissWarning() {
    this.warningDismissed.set(true);
  }

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
