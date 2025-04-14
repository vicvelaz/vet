import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-promotions',
  imports: [MatButtonModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  readonly dialogService = inject(UtilsService);

  data = input.required<any>({});

  openDialog(imageName: string) {
    this.dialogService.openDialog(imageName);
  }
}
