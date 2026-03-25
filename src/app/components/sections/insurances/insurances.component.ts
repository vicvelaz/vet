import { AfterViewInit, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InsuranceItem, InsurancesSection } from '../../../services/app-data.interface';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-insurances',
  imports: [MatButtonModule],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss',
})
export class InsurancesComponent implements AfterViewInit {
  readonly utilsService = inject(UtilsService);

  data = input.required<InsurancesSection>({});

  ngAfterViewInit(): void {
    const images = this.data().items.map((promotion: InsuranceItem) => 'img/' + promotion.image);
    this.utilsService.preloadImages(images);
  }

  openDialog(imageName: string | undefined): void {
    if (imageName) {
      this.utilsService.openDialog('img/' + imageName);
    }
  }
}
