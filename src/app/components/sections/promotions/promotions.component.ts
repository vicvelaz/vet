import { AfterViewInit, Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PromotionItem, PromotionsSection } from '../../../services/app-data.interface';
import { RevealOnScrollDirective } from '../../ui/reveal-on-scroll.directive';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-promotions',
  imports: [MatButtonModule, RevealOnScrollDirective],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit, AfterViewInit {
  readonly utilsService = inject(UtilsService);

  data = input.required<PromotionsSection>({});

  ngOnInit(): void {
    this.data().items = this.data().items.filter((item: PromotionItem) => this.isPromotionAvaliable(item));
  }

  ngAfterViewInit(): void {
    if (!this.data().items) {
      return;
    }
    const images = this.data()
      .items.map((promotion: PromotionItem) => this.utilsService.resolveDialogImageSource(promotion.image))
      .filter((image): image is string => !!image);

    this.utilsService.preloadImages(images);
  }

  openDialog(imageName: PromotionItem['image']): void {
    this.utilsService.openDialog(imageName);
  }

  isPromotionAvaliable(promotion: PromotionItem): boolean {
    return this.utilsService.isPromotionAvailable(promotion.initDate, promotion.endDate);
  }

  formatDate(date?: string): string {
    const t = date ? Date.parse(date) : NaN;
    return isNaN(t) ? '' : new Date(t).toLocaleDateString();
  }
}
