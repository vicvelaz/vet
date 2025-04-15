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

  openDialog(imageName: string) {
    console.log('Opening DialogService:', imageName);
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

  // scrollToSection(sectionId: string) {
  //   const section = document.getElementById(sectionId);
  //   console.log('section', sectionId, section);
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  navigateToFragment(fragment: string) {
    const currentUrl = this.router.url.split('#')[0];

    if (currentUrl === '/' || currentUrl === '/home') {
      // Ya estamos en home, solo hacemos scroll
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Redirige al home y pasa el fragment como parámetro
      this.router.navigate(['/'], { fragment });
    }
  }
}
