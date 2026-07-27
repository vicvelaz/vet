import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogImageComponent } from '../components/ui';
import { AppData } from './app-data.interface';
import { environment } from '../../environments/environment';

type SanityImageLike = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  url?: string;
  src?: string;
};

export type DialogImageInput = string | SanityImageLike | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  private imageCache = new Map<string, HTMLImageElement>();

  openDialog(imageName: DialogImageInput): void {
    if (!imageName) {
      return;
    }

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
    console.log('Dialog opened with image:', imageName);

    dialogRef.afterClosed().subscribe();
  }

  resolveDialogImageSource(imageName: DialogImageInput): string | null {
    if (!imageName) {
      return null;
    }

    if (typeof imageName === 'string') {
      if (this.isAbsoluteOrRootPath(imageName)) {
        return imageName;
      }

      if (imageName.startsWith('image-')) {
        return this.buildSanityImageUrlFromRef(imageName);
      }

      return imageName.startsWith('img/') ? imageName : `img/${imageName}`;
    }

    if (typeof imageName === 'object') {
      if (imageName.asset?.url) {
        return imageName.asset.url;
      }

      if (imageName.url) {
        return imageName.url;
      }

      if (imageName.src) {
        return imageName.src;
      }

      if (imageName.asset?._ref) {
        return this.buildSanityImageUrlFromRef(imageName.asset._ref);
      }
    }

    return null;
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

  private isAbsoluteOrRootPath(path: string): boolean {
    return /^(https?:\/\/|data:|blob:|\/)/i.test(path);
  }

  private buildSanityImageUrlFromRef(ref: string): string | null {
    const match = ref.match(/^image-([^-]+)-(\d+x\d+)-([a-z0-9]+)$/i);

    if (!match) {
      return null;
    }

    const [, assetId, dimensions, format] = match;
    const { projectId, dataset } = environment.sanity;

    if (!projectId || !dataset) {
      return null;
    }

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
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

  mergeWithDefaults(defaults: AppData, sanity: any): AppData {
    console.log(sanity);
    return {
      ...defaults,
      warning: sanity.warning ?? defaults.warning,
      header: {
        ...defaults.header,
        logo: sanity.logo ?? defaults.header.logo,
      },
      sections: {
        ...defaults.sections,
        hero: {
          ...defaults.sections.hero,
          banner: sanity.heroBanner ?? defaults.sections.hero.banner,
        },
        services: {
          ...defaults.sections.services,
          items: sanity.services ?? defaults.sections.services.items,
        },
        timetable: {
          ...defaults.sections.timetable,
          items: sanity.timetable ?? defaults.sections.timetable.items,
        },
        contact: {
          ...defaults.sections.contact,
          items: sanity.contact?.items ?? defaults.sections.contact.items,
          socialMedia: sanity.contact?.socialMedia ?? defaults.sections.contact.socialMedia,
        },
        promotions: {
          ...defaults.sections.promotions,
          items: sanity.promotions ?? defaults.sections.promotions.items,
        },
        insurances: {
          ...defaults.sections.insurances,
          items: sanity.insurances ?? defaults.sections.insurances.items,
        },
      },
      footer: defaults.footer,
    };
  }
}
