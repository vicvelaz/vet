import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-insurances',
  imports: [MatButtonModule],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss',
})
export class InsurancesComponent {
  readonly dialogService = inject(UtilsService);

  data = input.required<any>({});

  openDialog(imageName: string) {
    this.dialogService.openDialog(imageName);
  }
}
