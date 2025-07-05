import { AfterViewInit, Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-promotions',
  imports: [MatButtonModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements AfterViewInit, OnInit {
  readonly utilsService = inject(UtilsService);

  data = input.required<any>({});
  today = signal(new Date());

  ngOnInit(): void {
    this.data().items.forEach((promotion: any) => {
      // promotion.date = new Date(promotion.date).toLocaleDateString();
      // if (new Date(promotion.date).setHours(0, 0, 0, 0) < this.today().setHours(0, 0, 0, 0)) {
      //   console.warn(`Promotion ${promotion.title} is expired: ${promotion.date}`);
      //   console.log(this.today());
      // } else {
      //   console.log(`Promotion ${promotion.title} is valid until: ${promotion.date}`);
      // }
    });
  }

  ngAfterViewInit(): void {
    const images = this.data().items.map((promotion: any) => 'img/' + promotion.image);
    this.utilsService.preloadImages(images);
  }

  openDialog(imageName: string) {
    this.utilsService.openDialog('img/' + imageName);
  }

  isValidDate(promotionDate: string): boolean {
    console.log('Checking date:', new Date(promotionDate), this.today());
    return new Date(promotionDate).setHours(0, 0, 0, 0) >= this.today().setHours(0, 0, 0, 0);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
