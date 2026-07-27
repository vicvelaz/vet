import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogImageInput, UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-dialog-image',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss',
})
export class DialogImageComponent {
  readonly utilsService = inject(UtilsService);
  readonly data = inject<{ imageName: DialogImageInput }>(MAT_DIALOG_DATA);
  readonly imageSrc = computed(() => this.utilsService.resolveDialogImageSource(this.data.imageName));
}
