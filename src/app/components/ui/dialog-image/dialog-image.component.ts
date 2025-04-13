import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-image',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss',
})
export class DialogImageComponent {}
