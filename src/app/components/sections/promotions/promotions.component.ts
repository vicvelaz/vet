import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
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
  today = signal(new Date());

  ngAfterViewInit(): void {
    const images = this.data().items.map((promotion: any) => 'img/' + promotion.image);
    this.utilsService.preloadImages(images);
  }

  openDialog(imageName: string) {
    this.utilsService.openDialog('img/' + imageName);
  }

  isValidDate(promotionDate: string): boolean {
    return new Date(promotionDate).setHours(0, 0, 0, 0) >= this.today().setHours(0, 0, 0, 0);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
