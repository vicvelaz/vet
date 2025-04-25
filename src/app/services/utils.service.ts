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
}
