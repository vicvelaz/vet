import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-promotions',
  imports: [MatButtonModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  readonly dialogService = inject(DialogService);

  data = input.required<any>({});

  openDialog(imageName: string) {
    this.dialogService.openDialog(imageName);
  }
}
