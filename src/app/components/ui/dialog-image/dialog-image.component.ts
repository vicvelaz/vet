import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-dialog-image',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss',
})
export class DialogImageComponent {
  readonly data = inject<{ imageName: string }>(MAT_DIALOG_DATA);

  readonly utilsService = inject(UtilsService);

  @ViewChild('preloadedImage', { static: true }) imageElement!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    const image = this.utilsService.getImage(this.data.imageName);
    if (image) {
      this.imageElement.nativeElement.src = image.src;
    }
  }
}
