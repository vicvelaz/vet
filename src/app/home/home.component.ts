import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, MatIconModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {}
