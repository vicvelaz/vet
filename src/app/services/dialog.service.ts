import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageComponent } from '../components/ui';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
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
}
