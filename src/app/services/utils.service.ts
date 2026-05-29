import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogImageComponent } from '../components/ui';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  private imageCache = new Map<string, HTMLImageElement>();

  openDialog(imageName: string) {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: {
        imageName: imageName,
      },
    });

    dialogRef.afterClosed().subscribe();
  }

  navigateToFragment(fragment: string) {
    const currentUrl = this.router.url.split('#')[0];

    if (currentUrl === '/' || currentUrl === '/home') {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment });
    }
  }

  preloadImages(urls: string[]) {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      this.imageCache.set(url, img);
    });
  }

  getImage(url: string): HTMLImageElement | undefined {
    return this.imageCache.get(url);
  }

  /**
   * Check if a promotion is available based on optional init and end dates.
   * - Returns false if a provided date is invalid or out of range.
   * - Treats empty string as invalid.
   */
  isPromotionAvailable(initDate?: string, endDate?: string): boolean {
    const today = new Date();

  // Convertimos strings a Date si existen
  const start = initDate ? new Date(initDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Caso 1: hay ambas fechas → hoy debe estar entre ellas
  if (start && end) {
    return today >= start && today <= end;
  }

  // Caso 2: solo hay fecha de inicio → hoy debe ser posterior o igual
  if (start && !end) {
    return today >= start;
  }

  // Caso 3: solo hay fecha de fin → hoy no debe haber pasado esa fecha
  if (!start && end) {
    return today <= end;
  }

  // Caso 4: no hay fechas → no mostrar promoción (puedes cambiarlo si quieres)
  return false;
  }
}
