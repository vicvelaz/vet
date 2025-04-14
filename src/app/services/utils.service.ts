import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageComponent } from '../components/ui';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  readonly dialog = inject(MatDialog);

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

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    console.log('section', sectionId, section);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
