import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { FooterComponent, HeaderComponent } from './components/layout';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly appDataService = inject(AppDataService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  data = signal<any>(null);

  ngOnInit() {
    injectSpeedInsights();
    this.data.set(this.appDataService.data());
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
