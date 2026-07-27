import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SanityImageComponent } from '../sanity-image/sanity-image.component';

@Component({
  selector: 'app-dialog-image',
  imports: [MatButtonModule, MatIconModule, MatDialogModule, SanityImageComponent],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss',
})
export class DialogImageComponent {
  readonly data = inject<{ imageName: string }>(MAT_DIALOG_DATA);
}
