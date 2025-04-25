import { AfterViewInit, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-promotions',
  imports: [MatButtonModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements AfterViewInit {
  readonly utilsService = inject(UtilsService);

  data = input.required<any>({});

  ngAfterViewInit(): void {
    const images = this.data().items.map((promotion: any) => 'img/' + promotion.image);
    this.utilsService.preloadImages(images);
  }

  openDialog(imageName: string) {
    this.utilsService.openDialog('img/' + imageName);
  }
}
